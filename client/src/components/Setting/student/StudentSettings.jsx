import React, { useState } from 'react';

const StudentSettings = ({ userInfo, setUserInfo }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSave = () => {
    // Implement save logic here
    setUserInfo({ ...userInfo, password: newPassword, photo });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Student Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          className="block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Photo</label>
        <input
          type="file"
          onChange={handlePhotoChange}
          className="block w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default StudentSettings;