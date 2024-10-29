// client/src/components/ui/Modal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <motion.div
        className="bg-white p-6 rounded-3xl shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
      >
        <button
          className="text-3xl absolute top-2 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
