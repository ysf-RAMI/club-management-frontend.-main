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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 border w-full max-w-lg shadow-lg rounded-lg bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Club</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">
              Club Name
            </label>
            <input
              type="text"
              id="clubName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Club Description
            </label>
            <textarea
              id="clubDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full h-24 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="clubImage" className="block text-sm font-medium text-gray-700 mb-1">
              Club Image
            </label>
            <input
              type="text"
              id="clubImage"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="clubCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Club Category
              </label>
              <input
                type="text"
                id="clubCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="clubCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                Club Capacity
              </label>
              <input
                type="number"
                id="clubCapacity"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
