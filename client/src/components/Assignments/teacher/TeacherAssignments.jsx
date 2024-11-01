import React, { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import {
  ASSIGNMENT_TEACHER,
  ASSIGNMENT_CREATE,
  ASSIGNMENT_DELETE_ROUTE,
  ASSIGNMENT_ROUTE,
  ASSIGNMENT_UPDATE_ROUTE
} from "@/utils/constants.js";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating temporary IDs
import axios from "axios";
import { useAppstore } from "../../../../store/index.js";
import {apiClient} from "@/lib/apiClient.js";
import { useToast } from "@/hooks/use-toast"

const TeacherAssignments = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
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
    // Fetch assignments for the logged-in teacher from the server
    const fetchAssignments = async () => {
      try {
        const response = await apiClient.get(`${ASSIGNMENT_TEACHER}/${userInfo.id}`);
        if (response.status === 200 && response.data) {
          console.log('Assignments fetched:', response.data);
          setAssignments(response.data.map(assignment => ({...assignment, status: 'synced'})));
        } else {
          console.error('Failed to fetch assignments:', response);
          toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There was a problem with your request." });
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    if (userInfo) {
      fetchAssignments();
    }
  }, [userInfo, assignments]);

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

  const handleAddAssignment = async () => {
    const tempId = uuidv4(); // Generate a temporary unique ID
    const assignmentWithTempId = { ...newAssignment, id: tempId, fileUrl: null, status: 'new' };
    setAssignments([...assignments, assignmentWithTempId]); // Immediately show the new assignment in the list
    setChangesMade(true);
    setIsAdding(false);

    try {
      const startTime = newAssignment.startTime.toString();
      const endTime = newAssignment.endTime.toString();
      const date = newAssignment.date.toString();
      const startDate = new Date(`${date}T${startTime}:00`);
      const endDate = new Date(`${date}T${endTime}:00`);

      const formData = new FormData();
      formData.append('name', newAssignment.name);
      formData.append('description', newAssignment.description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      // you need to append the class that the teacher want to add the assignment to
      // you need to append the max grade for the assignment
      formData.append('teacher_id', userInfo.id);
      if (newAssignment.file) formData.append('file', newAssignment.file);

      const response = await apiClient.post(ASSIGNMENT_CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update the assignment with the ID and file URL from the server
      setAssignments(assignments.map(assignment =>
          assignment.id === tempId ? { ...assignment, id: response.data.id, fileUrl: response.data.fileUrl, status: 'synced' } : assignment
      ));
      setChangesMade(false);
    } catch (error) {
      console.error('Error adding assignment:', error);
      alert('Failed to add assignment. Please try again.');
    }
  };

  const handleFileChange = (event) => {
    setNewAssignment({ ...newAssignment, file: event.target.files[0] });
    setChangesMade(true);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setNewAssignment(assignment);
    setIsAdding(false);
  };

  const handleSaveAssignment = async () => {
    // const updatedAssignments = assignments.map(assignment =>
    //     assignment.id === newAssignment.id
    //         ? { ...newAssignment, status: 'edited' }
    //         : assignment
    // );
    // setAssignments(updatedAssignments);
    // setSelectedAssignment(null);
    setChangesMade(true);

    try {
      const startTime = newAssignment.startTime.toString();
      const endTime = newAssignment.endTime.toString();
      const date = convertToISOFormat(newAssignment.date.toString());
      const startDate = new Date(`${date}T${startTime}:00`).toISOString();
      const endDate = new Date(`${date}T${endTime}:00`).toISOString();

      const formData = new FormData();
      formData.append('name', newAssignment.name);
      formData.append('description', newAssignment.description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      // you need to append the class that the teacher want to add the assignment to
      // you need to append the max grade for the assignment
      formData.append('teacher_id', userInfo.id);
      if (newAssignment.file) formData.append('file', newAssignment.file);

      const response = await apiClient.put(`${ASSIGNMENT_UPDATE_ROUTE}/${newAssignment.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 400) {
        toast({ variant: "destructive", title: "All fields are required", description: "Please fill in all fields" });
      } else if (response.status === 200) {
        setAssignments(assignments.map(assignment =>
            assignment.id === newAssignment.id ? { ...assignment, fileUrl: response.data.fileUrl, status: 'synced' } : assignment
        ));
        setChangesMade(false);
        setSelectedAssignment(null);
      } else {
        toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There is an error with your update request" });
        setSelectedAssignment(null);
      }

    } catch (error) {
      console.error('Error saving assignment:', error);
      alert('Failed to save assignment. Please try again.');
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      const response = await apiClient.delete(`${ASSIGNMENT_DELETE_ROUTE}/${id}`);
      if (response.status !== 200) {
        toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There is an error with your delete request" });
      }
      setAssignments(assignments.filter(assignment => assignment.id !== id));
      setChangesMade(true);
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Failed to delete assignment. Please try again.');
    }
  };

  const handleSaveAllChanges = async () => {
    const newAssignments = assignments.filter(assignment => assignment.status === 'new');
    const editedAssignments = assignments.filter(assignment => assignment.status === 'edited');

    try {
      // Save new assignments to the server
      const newAssignmentPromises = newAssignments.map(async (assignment) => {
        const formData = new FormData();
        formData.append('name', assignment.name);
        formData.append('description', assignment.description);
        formData.append('date', assignment.date);
        formData.append('startTime', assignment.startTime);
        formData.append('endTime', assignment.endTime);
        if (assignment.file) formData.append('file', assignment.file);

        const response = await axios.post('/api/assignments', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return { ...assignment, id: response.data.id, fileUrl: response.data.fileUrl, status: 'synced' };
      });

      // Save edited assignments to the server
      const editedAssignmentPromises = editedAssignments.map(async (assignment) => {
        const formData = new FormData();
        formData.append('name', assignment.name);
        formData.append('description', assignment.description);
        formData.append('date', assignment.date);
        formData.append('startTime', assignment.startTime);
        formData.append('endTime', assignment.endTime);
        if (assignment.file) formData.append('file', assignment.file);

        const response = await axios.put(`/api/assignments/${assignment.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return { ...assignment, fileUrl: response.data.fileUrl, status: 'synced' };
      });

      // Await all server operations to complete
      const updatedNewAssignments = await Promise.all(newAssignmentPromises);
      const updatedEditedAssignments = await Promise.all(editedAssignmentPromises);

      // Merge the updated assignments back into the state
      setAssignments([
        ...assignments.filter(assignment => assignment.status === 'synced'), // Keep assignments that are already synced
        ...updatedNewAssignments,
        ...updatedEditedAssignments,
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
            <p className="text-gray-600">Manage your assignments effectively with iSchool.</p>
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
            Add New Assignment
          </button>

          <h2 className="text-3xl font-semibold text-gray-800 my-10">Current Assignments</h2>
          <div className="grid grid-cols-1 gap-4">
            {assignments.map(assignment => (
                <div key={assignment.id} className="p-4 border rounded-3xl bg-white shadow">
                  <h3 className="text-xl font-semibold">{assignment.name}</h3>
                  <p>{assignment.description}</p>
                  <p><strong>Date:</strong> {assignment.date}</p>
                  <p><strong>Time:</strong> {assignment.startTime} - {assignment.endTime}</p>
                  {assignment.fileUrl && (
                      <p>
                        <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          View Uploaded File
                        </a>
                      </p>
                  )}
                  <button
                      onClick={() => handleEditAssignment(assignment)}
                      className="mr-2 py-1 px-3 bg-purple-800 text-white rounded-full hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
            ))}
          </div>

          {(isAdding || selectedAssignment) && (
              <Modal isOpen={true} onClose={() => { setIsAdding(false); setSelectedAssignment(null); }}>
                <div className="text-gray-800">
                  <h2 className="text-2xl font-semibold mb-4">
                    {isAdding ? 'Add New Assignment' : 'Edit Assignment'}
                  </h2>
                  <form>
                    <input
                        type="text"
                        value={newAssignment.name}
                        onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
                        placeholder="Assignment Name"
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <textarea
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                        placeholder="Description"
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="date"
                        value={newAssignment.date}
                        onChange={(e) => setNewAssignment({ ...newAssignment, date: e.target.value })}
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="time"
                        value={newAssignment.startTime}
                        onChange={(e) => setNewAssignment({ ...newAssignment, startTime: e.target.value })}
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="time"
                        value={newAssignment.endTime}
                        onChange={(e) => setNewAssignment({ ...newAssignment, endTime: e.target.value })}
                        className="block w-full p-2 border mb-4 rounded"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full p-2 mb-4"
                    />
                  </form>
                  <button
                      onClick={isAdding ? handleAddAssignment : handleSaveAssignment}
                      className="mr-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    {isAdding ? 'Add Assignment' : 'Save Assignment'}
                  </button>
                  <button
                      onClick={() => { setIsAdding(false); setSelectedAssignment(null); }}
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

export default TeacherAssignments;