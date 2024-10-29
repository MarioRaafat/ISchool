import React, { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import {EXAM_CREATE, EXAM_DELETE_ROUTE, EXAM_ROUTE, EXAM_TEACHER} from "@/utils/constants.js";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating temporary IDs
import axios from "axios";
import { useAppstore } from "../../../../store/index.js";
import {apiClient} from "@/lib/apiClient.js";
import { useToast } from "@/hooks/use-toast"

const TeacherExam = () => {
  const { toast } = useToast();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [newExam, setNewExam] = useState({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    file: null
  });
  const [isAdding, setIsAdding] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const { userInfo } = useAppstore();

  useEffect(() => {
    // Fetch exams for the logged-in teacher from the server
    const fetchExams = async () => {
      try {
        const response = await apiClient.get(`${EXAM_TEACHER}/${userInfo.id}`);
        if (response.status === 200 && response.data) {
          console.log('Exams fetched:', response.data);
          setExams(response.data.map(exam => ({...exam, status: 'synced'})));
        } else {
          console.error('Failed to fetch exams:', response);
          toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There was a problem with your request." });
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    if (userInfo) {
      fetchExams();
    }
  }, [userInfo, exams]);

  // From Chat-GPT
  function convertToISOFormat(dateStr) {
    // Regular expression to check if the input is in informal format
    const informalFormat = /^[A-Za-z]{3} [A-Za-z]{3} \d{1,2}$/;

    // Check if the input is in informal format
    if (informalFormat.test(dateStr)) {
      const currentYear = new Date().getFullYear(); // Get current year
      const formattedDate = new Date(`${dateStr} ${currentYear}`);

      // Format the date to YYYY-MM-DD
      const isoDate = formattedDate.toISOString().split('T')[0];
      return isoDate; // Return the ISO date format
    }

    // If it's already in ISO format or another format, return it unchanged
    return dateStr;
  }

  const handleAddExam = async () => {
    const tempId = uuidv4(); // Generate a temporary unique ID
    const examWithTempId = { ...newExam, id: tempId, fileUrl: null, status: 'new' };
    setExams([...exams, examWithTempId]); // Immediately show the new exam in the list
    setChangesMade(true);
    setIsAdding(false);

    try {
      const startTime = newExam.startTime.toString();
      const endTime = newExam.endTime.toString();
      const date = newExam.date.toString();
      const startDate = new Date(`${date}T${startTime}:00`);
      const endDate = new Date(`${date}T${endTime}:00`);

      const formData = new FormData();
      formData.append('name', newExam.name);
      formData.append('description', newExam.description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      // you need to append the class that the teacher want to add the exam to
      // you need to append the max grade for the exam
      formData.append('teacher_id', userInfo.id);
      if (newExam.file) formData.append('file', newExam.file);

      const response = await apiClient.post(EXAM_CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update the exam with the ID and file URL from the server
      setExams(exams.map(exam =>
          exam.id === tempId ? { ...exam, id: response.data.id, fileUrl: response.data.fileUrl, status: 'synced' } : exam
      ));
      setChangesMade(false);
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('Failed to add exam. Please try again.');
    }
  };

  const handleFileChange = (event) => {
    setNewExam({ ...newExam, file: event.target.files[0] });
    setChangesMade(true);
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setNewExam(exam);
    setIsAdding(false);
  };

  const handleSaveExam = async () => {
    // const updatedExams = exams.map(exam =>
    //     exam.id === newExam.id
    //         ? { ...newExam, status: 'edited' }
    //         : exam
    // );
    // setExams(updatedExams);
    // setSelectedExam(null);
    setChangesMade(true);

    try {
      const startTime = newExam.startTime.toString();
      const endTime = newExam.endTime.toString();
      const date = convertToISOFormat(newExam.date.toString());
      const startDate = new Date(`${date}T${startTime}:00`).toISOString();
      const endDate = new Date(`${date}T${endTime}:00`).toISOString();

      const formData = new FormData();
      formData.append('name', newExam.name);
      formData.append('description', newExam.description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      // you need to append the class that the teacher want to add the exam to
      // you need to append the max grade for the exam
      formData.append('teacher_id', userInfo.id);
      if (newExam.file) formData.append('file', newExam.file);

      const response = await apiClient.put(`${EXAM_ROUTE}/${newExam.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 400) {
        toast({ variant: "destructive", title: "All fields are required", description: "Please fill in all fields" });
      } else if (response.status === 200) {
        setExams(exams.map(exam =>
            exam.id === newExam.id ? { ...exam, fileUrl: response.data.fileUrl, status: 'synced' } : exam
        ));
        setChangesMade(false);
        setSelectedExam(null);
      } else {
        toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There is an error with your update request" });
        setSelectedExam(null);
      }

    } catch (error) {
      console.error('Error saving exam:', error);
      alert('Failed to save exam. Please try again.');
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      const response = await apiClient.delete(`${EXAM_DELETE_ROUTE}/${id}`);
      if (response.status !== 200) {
        toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There is an error with your delete request" });
      }
      setExams(exams.filter(exam => exam.id !== id));
      setChangesMade(true);
    } catch (error) {
      console.error('Error deleting exam:', error);
      alert('Failed to delete exam. Please try again.');
    }
  };

  const handleSaveAllChanges = async () => {
    const newExams = exams.filter(exam => exam.status === 'new');
    const editedExams = exams.filter(exam => exam.status === 'edited');

    try {
      // Save new exams to the server
      const newExamPromises = newExams.map(async (exam) => {
        const formData = new FormData();
        formData.append('name', exam.name);
        formData.append('description', exam.description);
        formData.append('date', exam.date);
        formData.append('startTime', exam.startTime);
        formData.append('endTime', exam.endTime);
        if (exam.file) formData.append('file', exam.file);

        const response = await axios.post('/api/exams', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return { ...exam, id: response.data.id, fileUrl: response.data.fileUrl, status: 'synced' };
      });

      // Save edited exams to the server
      const editedExamPromises = editedExams.map(async (exam) => {
        const formData = new FormData();
        formData.append('name', exam.name);
        formData.append('description', exam.description);
        formData.append('date', exam.date);
        formData.append('startTime', exam.startTime);
        formData.append('endTime', exam.endTime);
        if (exam.file) formData.append('file', exam.file);

        const response = await axios.put(`/api/exams/${exam.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return { ...exam, fileUrl: response.data.fileUrl, status: 'synced' };
      });

      // Await all server operations to complete
      const updatedNewExams = await Promise.all(newExamPromises);
      const updatedEditedExams = await Promise.all(editedExamPromises);

      // Merge the updated exams back into the state
      setExams([
        ...exams.filter(exam => exam.status === 'synced'), // Keep exams that are already synced
        ...updatedNewExams,
        ...updatedEditedExams,
      ]);

      setChangesMade(false);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  return (
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 p-8 bg-gray-100 min-h-screen overflow-y-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Good morning, Teacher</h2>
            <p className="text-gray-600">Manage your exams effectively with iSchool.</p>
          </header>

          {/*{changesMade && (*/}
          {/*    <button*/}
          {/*        onClick={handleSaveAllChanges}*/}
          {/*        className="mb-4 mr-2 py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600">*/}
          {/*      Save All Changes*/}
          {/*    </button>*/}
          {/*)}*/}

          {/*why is the above code while it is not needed as the changes are saved automatically*/}

          <button
              onClick={() => setIsAdding(true)}
              className="mb-4 py-2 px-4 bg-purple-800 text-white rounded-full hover:bg-blue-600">
            Add New Exam
          </button>

          <h2 className="text-3xl font-semibold text-gray-800 my-10">Current Exams</h2>
          <div className="grid grid-cols-1 gap-4">
            {exams.map(exam => (
                <div key={exam.id} className="p-4 border rounded-3xl bg-white shadow">
                  <h3 className="text-xl font-semibold">{exam.name}</h3>
                  <p>{exam.description}</p>
                  <p><strong>Date:</strong> {exam.date}</p>
                  <p><strong>Time:</strong> {exam.startTime} - {exam.endTime}</p>
                  {exam.fileUrl && (
                      <p>
                        <a href={exam.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          View Uploaded File
                        </a>
                      </p>
                  )}
                  <button
                      onClick={() => handleEditExam(exam)}
                      className="mr-2 py-1 px-3 bg-purple-800 text-white rounded-full hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
            ))}
          </div>

          {(isAdding || selectedExam) && (
              <Modal isOpen={true} onClose={() => { setIsAdding(false); setSelectedExam(null); }}>
                <div className="text-gray-800">
                  <h2 className="text-2xl font-semibold mb-4">
                    {isAdding ? 'Add New Exam' : 'Edit Exam'}
                  </h2>
                  <form>
                    <input
                        type="text"
                        value={newExam.name}
                        onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                        placeholder="Exam Name"
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <textarea
                        value={newExam.description}
                        onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                        placeholder="Description"
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="date"
                        value={newExam.date}
                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="time"
                        value={newExam.startTime}
                        onChange={(e) => setNewExam({ ...newExam, startTime: e.target.value })}
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="time"
                        value={newExam.endTime}
                        onChange={(e) => setNewExam({ ...newExam, endTime: e.target.value })}
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full p-2 mb-4"
                    />
                  </form>
                  <button
                      onClick={isAdding ? handleAddExam : handleSaveExam}
                      className="mr-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    {isAdding ? 'Add Exam' : 'Save Exam'}
                  </button>
                  <button
                      onClick={() => { setIsAdding(false); setSelectedExam(null); }}
                      className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
          )}
        </div>
      </div>
  );
};

export default TeacherExam;