import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import Modal from '../../ui/Modal'; // Import the Modal component
import {useAppstore} from "../../../../store/index.js";
import {apiClient} from "@/lib/apiClient.js";
import {UPCOMING_ASSIGNMENTS} from "@/utils/constants.js"


const UpcomingAssignments = () => {
  const navigate = useNavigate();
  const {userInfo} = useAppstore();
  const [selectedAssignment, setSelectedAssignment] = useState(null); // State to manage the selected assignment
  const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchUpcomingAssignments = async () => {
            const response = await apiClient.post(UPCOMING_ASSIGNMENTS, { studentId: userInfo.id });
            if (response.status === 200) {
                setAssignments(response.data);
            };
        };
        if (userInfo) {
            fetchUpcomingAssignments();
        }
    }, [userInfo, assignments]);

  const handleNavigate = () => {
    navigate('/calendar');
  };

  const handleOpenModal = (assignment) => {
    setSelectedAssignment(assignment); // Set the selected assignment to show in the modal
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null); // Close the modal
  };

  return (
    <div className="mb-8 bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Assignments</h3>
      <ul className="space-y-4">
        {assignments.map((assignment, index) => (
          <li key={index} className="flex items-center justify-between text-gray-700 cursor-pointer" onClick={() => handleOpenModal(assignment)}>
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
                {new Date(assignment.date).getDate()} {/* Display the day of the month */}
              </motion.div>
              {/* Assignment Details */}
              <div>
                <p className="text-md font-semibold">{assignment.name}</p>
                <p className="text-sm text-gray-500">{assignment.description}</p>
                <p className="text-xs text-gray-400">{assignment.date}</p> {/* Display the date */}
              </div>
            </div>
            <span className="text-gray-500 text-sm ml-auto">{assignment.startTime} - {assignment.endTime}</span>
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

      {/* Modal for assignment details */}
      {selectedAssignment && (
        <Modal isOpen={selectedAssignment} onClose={handleCloseModal}>
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-4">{selectedAssignment.name}</h2>
            <p className="text-gray-600">Description: {selectedAssignment.description}</p>
            <p className="text-gray-600">Date: {selectedAssignment.date}</p>
            <p className="text-gray-600">Time: {selectedAssignment.startTime} - {selectedAssignment.endTime}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingAssignments;