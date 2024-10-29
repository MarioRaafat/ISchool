import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import Modal from '../../ui/Modal'; // Import the Modal component

const exams = [
  { date: "2024-10-05", name: "Introduction to iSchool", description: "Final exam for you", startTime: "10:00", endTime: "12:00" },
  { date: "2024-10-06", name: "Mathematics", description: "1 of 12 sessions, Mr. Johnson", startTime: "13:00", endTime: "15:00" },
  { date: "2024-10-07", name: "Team meeting", description: "1 of 20 meetings, Design Team", startTime: "12:00", endTime: "13:00" },
  { date: "2024-10-08", name: "Assignment 1", description: "1 of 2, Due on Friday", startTime: "16:00", endTime: "16:30" },
  { date: "2024-10-09", name: "Exam 1", description: "2 of 2, Due on Monday", startTime: "16:00", endTime: "16:30" },
];

const UpcomingExams = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState(null); // State to manage the selected exam

  const handleNavigate = () => {
    navigate('/calendar');
  };

  const handleOpenModal = (exam) => {
    setSelectedExam(exam); // Set the selected exam to show in the modal
  };

  const handleCloseModal = () => {
    setSelectedExam(null); // Close the modal
  };

  return (
    <div className="mb-8 bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Exams</h3>
      <ul className="space-y-4">
        {exams.map((exam, index) => (
          <li key={index} className="flex items-center justify-between text-gray-700 cursor-pointer" onClick={() => handleOpenModal(exam)}>
            <div className="flex items-center space-x-4">
              {/* Animated Circular Day */}
              <motion.div
                className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white font-semibold rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0.2,
                }}
              >
                {new Date(exam.date).getDate()} {/* Display the day of the month */}
              </motion.div>
              {/* Exam Details */}
              <div>
                <p className="text-md font-semibold">{exam.name}</p>
                <p className="text-sm text-gray-500">{exam.description}</p>
                <p className="text-xs text-gray-400">{exam.date}</p> {/* Display the date */}
              </div>
            </div>
            <span className="text-gray-500 text-sm ml-auto">{exam.startTime} - {exam.endTime}</span>
          </li>
        ))}
      </ul>
      {/* Button */}
      <button
        className="mt-6 w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
        onClick={handleNavigate}
      >
        View entire schedule
      </button>

      {/* Modal for exam details */}
      {selectedExam && (
        <Modal isOpen={selectedExam !== null} onClose={handleCloseModal}>
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-4">{selectedExam.name}</h2>
            <p className="text-gray-600">Description: {selectedExam.description}</p>
            <p className="text-gray-600">Date: {selectedExam.date}</p>
            <p className="text-gray-600">Time: {selectedExam.startTime} - {selectedExam.endTime}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingExams;