import React, { useState } from 'react';

export default function DeleteClubDialog({ open, onClose, onConfirm, clubName }) {
  const [confirmedClubName, setConfirmedClubName] = useState('');

  const handleConfirm = () => {
    if (confirmedClubName === clubName) {
      onConfirm();
      onClose();
    }
  };

  const handleClose = () => {
    setConfirmedClubName('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Club</h2>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete the club <strong>{clubName}</strong>? This action cannot
          be undone.
        </p>
        <p className="mb-2 text-sm text-gray-700">Type the club name below to confirm deletion.</p>
        <input
          type="text"
          placeholder={clubName}
          value={confirmedClubName}
          onChange={(e) => setConfirmedClubName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full mb-4 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              confirmedClubName === clubName
                ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={confirmedClubName !== clubName}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
