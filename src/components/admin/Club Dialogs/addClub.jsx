import { useState } from 'react';

const AddClubDialog = ({ onClose, onAddClub }) => {
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    categorie: '',
    max_members: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setClubData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClub(clubData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 border w-full max-w-lg shadow-lg rounded-lg bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Club</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Club Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={clubData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Club Description
            </label>
            <textarea
              id="description"
              name="description"
              value={clubData.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full h-24 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Club Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-1">
                Club Category
              </label>
              <input
                type="text"
                id="categorie"
                name="categorie"
                value={clubData.categorie}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="max_members" className="block text-sm font-medium text-gray-700 mb-1">
                Club Capacity
              </label>
              <input
                type="number"
                id="max_members"
                name="max_members"
                value={clubData.max_members}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Add Club
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClubDialog;
