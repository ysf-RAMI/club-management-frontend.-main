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
    <div className="fixed inset-0 z-2 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-6 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Club</h2>
        <p className="mb-4">
          Are you sure you want to delete the club <strong>{clubName}</strong>? This action cannot
          be undone.
        </p>
        <p className="mb-2">Type the club name below to confirm deletion.</p>
        <input
          type="text"
          placeholder={clubName}
          value={confirmedClubName}
          onChange={(e) => setConfirmedClubName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmedClubName === clubName ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={confirmedClubName !== clubName}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
