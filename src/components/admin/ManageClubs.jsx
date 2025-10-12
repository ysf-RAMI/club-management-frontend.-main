import { faEdit, faPlus, faSearch, faTrash, faUsers, faUsersCog, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddClubDialog from './Club Dialogs/addClub';
import DeleteClubDialog from './Club Dialogs/deleteClub';
import { useState } from 'react';
import EditClubDialog from './Club Dialogs/editClub';
import Header from '../common/Header';

// Dummy data for clubs
const initialClubs = [
  {
    id: 1,
    name: 'Photography Club',
    description: 'Capture moments, create memories, and explore the art of photography.',
    image: '/img/Club1.png',
    members: 85,
    events: 12,
    status: 'Active',
    created: 'Jan 15, 2024',
  },
  {
    id: 2,
    name: 'Debate Society',
    description: 'Engage in intellectual discourse and sharpen your public speaking skills.',
    image: '/img/Club2.png',
    members: 45,
    events: 8,
    status: 'Active',
    created: 'Feb 01, 2024',
  },
  {
    id: 3,
    name: 'Art & Creativity Club',
    description: 'A place for artists to collaborate, create, and showcase their work.',
    image: '/img/Club3.png',
    members: 60,
    events: 5,
    status: 'Inactive',
    created: 'Mar 10, 2024',
  },
];

export default function ManageClubs() {
  const [clubs] = useState(initialClubs);
  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);
  const [isDeleteClubModalOpen, setIsDeleteClubModalOpen] = useState(false);
  const [isEditClubModalOpen, setIsEditClubModalOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);
  const [clubToEdit, setClubToEdit] = useState(null);

  const openAddClubModal = () => setIsAddClubModalOpen(true);
  const closeAddClubModal = () => setIsAddClubModalOpen(false);

  const openDeleteClubModal = (club) => {
    setClubToDelete(club);
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
    console.log(`Deleting club: ${clubToDelete?.name}`);
    closeDeleteClubModal();
  };

  const handleEditConfirm = (updatedClub) => {
    console.log('Updating club:', updatedClub);
    closeEditClubModal();
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-4 bg-gray-100 text-gray-900 min-h-screen">
      <Header title="Manage Clubs" subtitle="Create, edit, and manage all clubs." icon={faUsers} />
      
      {isAddClubModalOpen && <AddClubDialog onClose={closeAddClubModal} />}
      {isDeleteClubModalOpen && (
        <DeleteClubDialog
          open={isDeleteClubModalOpen}
          onClose={closeDeleteClubModal}
          onConfirm={handleDeleteConfirm}
          clubName={clubToDelete?.name}
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

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search clubs..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm"
          />
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 flex items-center justify-center gap-2 cursor-pointer shadow-md w-full md:w-auto"
          onClick={openAddClubModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create New Club
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col">
            <img className="w-full h-48 object-cover" src={club.image} alt={club.name} />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{club.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-700 mb-4 border-t border-b border-gray-200 py-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsersCog} className="text-gray-400"/>
                  <span>{club.members} Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                  <span>{club.events} Events</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(club.status)}`}>
                  {club.status}
                </span>
                 <span className="text-xs text-gray-500">Created: {club.created}</span>
              </div>
              
              <div className="flex justify-end space-x-3 mt-auto">
                <button
                  onClick={() => openEditClubModal(club)}
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  aria-label={`Edit ${club.name}`}
                >
                  <FontAwesomeIcon icon={faEdit} className="text-lg" />
                </button>
                <button
                  onClick={() => openDeleteClubModal(club)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  aria-label={`Delete ${club.name}`}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
