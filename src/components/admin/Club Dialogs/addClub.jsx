const AddClubDialog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 border w-full max-w-lg shadow-lg rounded-lg bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Club</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">
              Club Name
            </label>
            <input
              type="text"
              id="clubName"
              name="clubName"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Club Description
            </label>
            <textarea
              id="clubDescription"
              name="clubDescription"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full h-24 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="clubImage" className="block text-sm font-medium text-gray-700 mb-1">
              Club Image
            </label>
            <input
              type="file"
              id="clubImage"
              name="clubImage"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full cursor-pointer"
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
                name="clubCategory"
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
                name="clubCapacity"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
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
