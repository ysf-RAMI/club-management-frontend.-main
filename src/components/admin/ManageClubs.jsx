import { faEdit, faPlus, faSearch, faTrash, faUsers, faUsersCog, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddClubDialog from './Club Dialogs/addClub';
import DeleteClubDialog from './Club Dialogs/deleteClub';
import { useEffect, useState } from 'react';
import EditClubDialog from './Club Dialogs/editClub';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { createClub, deleteClub, fetchClubs, updateClub } from '../../app/clubSlice';
import { API_BASE_URL } from '../../config/api';
import Loader from '../common/UI/Loader';

export default function ManageClubs() {
  const dispatch = useDispatch();
  const { clubs, loading } = useSelector((state) => state.clubs);

  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);
  const [isDeleteClubModalOpen, setIsDeleteClubModalOpen] = useState(false);
  const [isEditClubModalOpen, setIsEditClubModalOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);
  const [clubToEdit, setClubToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

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
    if (clubToDelete) {
      dispatch(deleteClub(clubToDelete.id));
      closeDeleteClubModal();
    }
  };

  const handleEditConfirm = (updatedClubData) => {
    if (clubToEdit) {
      const formData = new FormData();
      for (const key in updatedClubData) {
        formData.append(key, updatedClubData[key]);
      }
      // Laravel expects _method=PUT for PUT requests with FormData
      formData.append('_method', 'PUT');
      dispatch(updateClub({ clubId: clubToEdit.id, clubData: formData }));
      closeEditClubModal();
    }
  };

  const handleAddClub = (newClubData) => {
    const formData = new FormData();
    for (const key in newClubData) {
      formData.append(key, newClubData[key]);
    }
    dispatch(createClub(formData));
    closeAddClubModal();
  };

  const getStatusColor = (status) => {
    // The API data doesn't seem to have a 'status' field for the club itself.
    // If a club status needs to be displayed, we need to define how it's derived.
    // For now, returning a default style or removing the status display.
    return 'bg-gray-200 text-gray-800'; // Default style
  };

  return (
    <div className="p-4 bg-gray-100 text-gray-900 min-h-screen">
      <Header title="Manage Clubs" subtitle="Create, edit, and manage all clubs." icon={faUsers} />
      
      {isAddClubModalOpen && <AddClubDialog onClose={closeAddClubModal} onAddClub={handleAddClub} />} 
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

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <div key={club.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col">
              <img className="w-full h-48 object-cover" src={club.image ? `${API_BASE_URL}${club.image}` : `/images/default_club_image.jpg`} alt={club.name} />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{club.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-700 mb-4 border-t border-b border-gray-200 py-3">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsersCog} className="text-gray-400"/>
                    <span>{club.users_count} Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                    <span>{club.events?.length || 0} Events</span>
                  </div>
                </div>

                {/* Removed club status display as it's not in the API data */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs text-gray-500">Created: {new Date(club.created_at).toLocaleDateString()}</span>
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
      )}
    </div>
  );
}
