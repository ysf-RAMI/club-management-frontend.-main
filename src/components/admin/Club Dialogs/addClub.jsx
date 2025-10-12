const AddClubDialog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center z-2">
      <div className="relative p-6 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Club</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">
              Club Name
            </label>
            <input
              type="text"
              id="clubName"
              name="clubName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubDescription" className="block text-sm font-medium text-gray-700">
              Club Description
            </label>
            <textarea
              id="clubDescription"
              name="clubDescription"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="clubImage" className="block text-sm font-medium text-gray-700">
              Club Image
            </label>
            <input
              type="file"
              id="clubImage"
              name="clubImage"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubCategory" className="block text-sm font-medium text-gray-700">
              Club Category
            </label>
            <input
              type="text"
              id="clubCategory"
              name="clubCategory"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="clubCapacity" className="block text-sm font-medium text-gray-700">
              Club Capacity
            </label>
            <input
              type="number"
              id="clubCapacity"
              name="clubCapacity"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
