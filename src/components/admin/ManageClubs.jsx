import { faEdit, faPlus, faSearch, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddClubDialog from './Club Dialogs/addClub';
import DeleteClubDialog from './Club Dialogs/deleteClub';
import { useState } from 'react';
import EditClubDialog from './Club Dialogs/editClub';

export default function ManageClubs() {
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);
  const [isDeleteClubModalOpen, setIsDeleteClubModalOpen] = useState(false);
  const [isEditClubModalOpen, setIsEditClubModalOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);
  const [clubToEdit, setClubToEdit] = useState(null);

  const openAddClubModal = () => setIsAddClubModalOpen(true);
  const closeAddClubModal = () => setIsAddClubModalOpen(false);

  const openDeleteClubModal = (clubName) => {
    setClubToDelete(clubName);
    setIsDeleteClubModalOpen(true);
  };
  const closeDeleteClubModal = () => {
    setClubToDelete(null);
    setIsDeleteClubModalOpen(false);
  };

  const openEditClubModal = (club) => {
    setClubToEdit(club);
    setIsEditClubModalOpen(true);
  };
  const closeEditClubModal = () => {
    setClubToEdit(null);
    setIsEditClubModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Logic to delete the club
    console.log(`Deleting club: ${clubToDelete}`);
    closeDeleteClubModal();
  };

  const handleEditConfirm = (updatedClub) => {
    // Logic to update the club
    console.log('Updating club:', updatedClub);
    closeEditClubModal();
  };

  return (
    <div className="p-2">
      <div>
        {isAddClubModalOpen && <AddClubDialog onClose={closeAddClubModal} />}
        {isDeleteClubModalOpen && (
          <DeleteClubDialog
            open={isDeleteClubModalOpen}
            onClose={closeDeleteClubModal}
            onConfirm={handleDeleteConfirm}
            clubName={clubToDelete}
          />
        )}
        {isEditClubModalOpen && (
          <EditClubDialog
            open={isEditClubModalOpen}
            onClose={closeEditClubModal}
            onConfirm={handleEditConfirm}
            club={clubToEdit}
          />
        )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Clubs</h1>
          <p className="text-gray-600 text-sm">Create, edit, and manage all clubs.</p>
        </div>
        <button
          className="bg-blue-600 text-white p-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          onClick={openAddClubModal}
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
          <p className="text-white text-md px-2">Create New Club</p>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center  p-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search clubs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <FontAwesomeIcon
              icon={faSearch}
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide"
              >
                CLUB
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide"
              >
                MEMBERS
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide"
              >
                EVENTS
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide"
              >
                CREATED
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wide"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="/img/Club1.png" alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Photography Club</div>
                    <div className="text-xs text-gray-500">Capture moments, create memories</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">85</td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">12</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">Jan 15, 2024</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-medium">
                <a
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  onClick={() =>
                    openEditClubModal({
                      id: 1,
                      name: 'Photography Club',
                      description: 'Capture moments, create memories',
                    })
                  }
                >
                  <FontAwesomeIcon icon={faEdit} className="text-sm" />
                </a>
                <a
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  onClick={() => openDeleteClubModal('Photography Club')}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="/img/Club1.png" alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Photography Club</div>
                    <div className="text-xs text-gray-500">Capture moments, create memories</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">85</td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">12</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">Jan 15, 2024</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-medium">
                <a
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  onClick={() =>
                    openEditClubModal({
                      id: 2,
                      name: 'Photography Club',
                      description: 'Capture moments, create memories',
                    })
                  }
                >
                  <FontAwesomeIcon icon={faEdit} className="text-sm" />
                </a>
                <a
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  onClick={() => openDeleteClubModal('Photography Club')}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="/img/Club1.png" alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Photography Club</div>
                    <div className="text-xs text-gray-500">Capture moments, create memories</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">85</td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">12</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">Jan 15, 2024</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-medium">
                <a
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  onClick={() =>
                    openEditClubModal({
                      id: 3,
                      name: 'Photography Club',
                      description: 'Capture moments, create memories',
                    })
                  }
                >
                  <FontAwesomeIcon icon={faEdit} className="text-sm" />
                </a>
                <a
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  onClick={() => openDeleteClubModal('Photography Club')}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
