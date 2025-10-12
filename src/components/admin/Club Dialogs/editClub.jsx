import { useEffect, useState } from 'react';

export default function EditClubDialog({ open, onClose, onConfirm, club }) {
  const [name, setName] = useState(club?.name || '');
  const [description, setDescription] = useState(club?.description || '');
  const [image, setImage] = useState(club?.image || '');
  const [category, setCategory] = useState(club?.category || '');
  const [capacity, setCapacity] = useState(club?.capacity || 0);

  useEffect(() => {
    if (club) {
      setName(club.name || '');
      setDescription(club.description || '');
      setImage(club.image || '');
      setCategory(club.category || '');
      setCapacity(club.capacity || 0);
    }
  }, [club]);

  const handleConfirm = () => {
    onConfirm({
      ...club,
      name,
      description,
      image,
      category,
      capacity,
    });
  };

  const handleClose = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-2 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-6 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Club</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">
              Club Name
            </label>
            <input
              type="text"
              id="clubName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubDescription" className="block text-sm font-medium text-gray-700">
              Club Description
            </label>
            <textarea
              id="clubDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="clubImage" className="block text-sm font-medium text-gray-700">
              Club Image
            </label>
            <input
              type="text"
              id="clubImage"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubCategory" className="block text-sm font-medium text-gray-700">
              Club Category
            </label>
            <input
              type="text"
              id="clubCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubCapacity" className="block text-sm font-medium text-gray-700">
              Club Capacity
            </label>
            <input
              type="number"
              id="clubCapacity"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
