import React, { useState } from 'react';
import Modal from "../../ui/Modal";
import {EXAM_CREATE, EXAM_DELETE_ROUTE, EXAM_ROUTE, EXAM_TEACHER} from "@/utils/constants.js";
import {apiClient} from "@/lib/apiClient.js";

const examsData = [
  { id: 1, name: 'Mathematics', description: 'Final exam for Mathematics.', date: '2024-10-29', startTime: '10:00', endTime: '12:00', examPath: 'https://www.google.com', day: 'today' },
  { id: 2, name: 'Science', description: 'Mid-term for Science.', date: '2024-10-30', startTime: '13:00', endTime: '15:00', examPath: 'https://www.google.com', day: 'tomorrow' },
  { id: 3, name: 'English Literature', description: 'Assignment due.', date: '2024-10-31', startTime: '09:00', endTime: '11:00', examPath: 'https://www.google.com', day: 'in 2 days' },
];

const CurrentExams = () => {
  const [exams, setExams] = useState(examsData); // State to hold exams
  const [selectedExam, setSelectedExam] = useState(null);
  const [file, setFile] = useState(null); // State for the uploaded file
  const [isLoading, setIsLoading] = useState(false); // Loading state for upload
  const [isEditing, setIsEditing] = useState(false); // State for editing

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post(EXAM_CREATE, formData); // Upload file

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert("File uploaded successfully!"); // Feedback for successful upload
      setSelectedExam(null);
      setFile(null); // Reset the file state
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message); // Feedback for upload failure
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleUpdateExam = (updatedExam) => {
    setExams((prevExams) => 
      prevExams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
    );
    setIsEditing(false);
    setSelectedExam(null); // Close modal
  };

  const handleDeleteExam = (id) => {
    setExams((prevExams) => prevExams.filter((exam) => exam.id !== id)); // Delete exam
    setSelectedExam(null); // Close modal
  };

  const handleExamEdit = () => {
    if (selectedExam) {
      setIsEditing(true);
    }
  };

  const handleExamUpdate = () => {
    const { id, name, description, date, startTime, endTime } = selectedExam;
    handleUpdateExam({ id, name, description, date, startTime, endTime, examPath: selectedExam.examPath, day: selectedExam.day });
  };

  return (
    <div className="mb-8 bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Exams</h3>
      <ul className="space-y-4">
        {exams.map((exam) => (
          <li
            key={exam.id}
            className="flex items-center justify-between text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={() => setSelectedExam(exam)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={`https://ui-avatars.com/api/?name=${exam.name}&background=random&color=fff`} 
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-md font-semibold">{exam.name}</p>
                <p className="text-sm text-gray-500">{exam.description}</p>
                <p className="text-xs text-gray-400">
                  {exam.date} - {exam.startTime} to {exam.endTime}
                </p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">{exam.day}</span>
          </li>
        ))}
      </ul>

      {/* Modal for exam details */}
      <Modal isOpen={selectedExam !== null} onClose={() => setSelectedExam(null)}>
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold mb-4">{selectedExam?.name}</h2>
          <p className="text-gray-600">Due Date: {selectedExam?.day}</p>
          <p className="text-gray-600">Date: {selectedExam?.date}</p>
          <p className="text-gray-600">Time: {selectedExam?.startTime} - {selectedExam?.endTime}</p>
          <a
            href={selectedExam?.examPath}
            className="mt-4 inline-block py-2 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            download
          >
            Download Exam
          </a>

          {/* Edit and Delete Buttons */}
          <div className="mt-4">
            <button
              onClick={handleExamEdit}
              className="mr-2 py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Edit Exam
            </button>
            <button
              onClick={() => handleDeleteExam(selectedExam.id)}
              className="py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              Delete Exam
            </button>
          </div>

          {/* File Upload Section */}
          <div className="mt-6">
            <input
              type="file"
              onChange={handleFileChange}
              className="border rounded-md p-2 mb-2"
            />
            <button
              onClick={handleUpload}
              className={`py-2 px-4 rounded-full ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
              disabled={isLoading} // Disable button during upload
            >
              {isLoading ? 'Uploading...' : 'Upload Solution'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal for Updating Exam */}
      {isEditing && selectedExam && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Edit Exam</h2>
            <input
              type="text"
              value={selectedExam.name}
              onChange={(e) => setSelectedExam({ ...selectedExam, name: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Exam Name"
            />
            <input
              type="text"
              value={selectedExam.description}
              onChange={(e) => setSelectedExam({ ...selectedExam, description: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Description"
            />
            <input
              type="date"
              value={selectedExam.date}
              onChange={(e) => setSelectedExam({ ...selectedExam, date: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="time"
              value={selectedExam.startTime}
              onChange={(e) => setSelectedExam({ ...selectedExam, startTime: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="time"
              value={selectedExam.endTime}
              onChange={(e) => setSelectedExam({ ...selectedExam, endTime: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={handleExamUpdate}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Update Exam
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CurrentExams;
