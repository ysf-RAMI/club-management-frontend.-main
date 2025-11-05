

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faFolder, 
    faImage, 
    faFilePdf, 
    faFileWord, 
    faFileExcel, 
    faFilePowerpoint,
    faFileAlt,
    faDownload,
    faUpload,
    faSearch,
    faFilter,
    faEye,
    faTrash,
    faEdit,
    faCalendarAlt,
    faUser,
    faTimes,
    faPlus
} from "@fortawesome/free-solid-svg-icons"

export default function ClubFilesManagment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddClubModal, setShowAddClubModal] = useState(false);
  const [showEditClubModal, setShowEditClubModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [selectedFileClubId, setSelectedFileClubId] = useState(null);
  const [adminMemberClubId, setAdminMemberClubId] = useState(null); // Placeholder for admin-member's club ID

  useEffect(() => {
    // In a real application, you would fetch the admin-member's club ID here
    // For now, we'll hardcode it for demonstration purposes.
    // This club ID should come from the authenticated user's data.
    setAdminMemberClubId(1); // Assuming admin-member is admin of club with ID 1
  }, []);

  // Sample data for clubs, gallery images, and documents
  const allClubs = [
    {
      id: 1,
      name: "Photography Club",
      category: "Arts",
      description: "A club for photography enthusiasts.",
      image: "/img/Club1.png",
      gallery: [
        { id: 101, url: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Photo1", type: "image", name: "Sunset.jpg" },
        { id: 102, url: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Photo2", type: "image", name: "Landscape.png" },
      ],
      documents: [
        { id: 201, url: "https://www.africau.edu/images/default/sample.pdf", type: "pdf", name: "Club_Rules.pdf" },
        { id: 202, url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf", name: "Membership_Form.pdf" },
      ],
    },
    {
      id: 2,
      name: "Robotics Club",
      category: "Technology",
      description: "Innovating the future with robotics.",
      image: "/img/Club2.png",
      gallery: [
        { id: 103, url: "https://via.placeholder.com/150/FFFF00/000000?text=Robot1", type: "image", name: "Robot_Design.jpg" },
        { id: 104, url: "https://via.placeholder.com/150/00FFFF/000000?text=Robot2", type: "image", name: "Competition.png" },
      ],
      documents: [
        { id: 203, url: "https://www.africau.edu/images/default/sample.pdf", type: "pdf", name: "Robot_Specs.pdf" },
      ],
    },
    {
      id: 3,
      name: "Chess Club",
      category: "Strategy",
      description: "Where minds meet and strategies unfold.",
      image: "/img/Club3.png",
      gallery: [
        { id: 105, url: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Chess1", type: "image", name: "Tournament.jpg" },
      ],
      documents: [
        { id: 204, url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf", name: "Chess_Rules.pdf" },
      ],
    },
  ];

  const clubs = adminMemberClubId ? allClubs.filter(club => club.id === adminMemberClubId) : [];

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'All' || club.category === filterCategory)
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return faFilePdf;
      case 'image':
        return faImage;
      default:
        return faFile;
    }
  };

  const handleAddClub = (newClub) => {
    console.log('Adding club:', newClub);
    // In a real app, you'd send this to your backend API
    setShowAddClubModal(false);
  };

  const handleEditClub = (updatedClub) => {
    console.log('Editing club:', updatedClub);
    // In a real app, you'd send this to your backend API
    setShowEditClubModal(false);
    setSelectedClub(null);
  };

  const handleDeleteClub = (clubId) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      console.log('Deleting club:', clubId);
      // In a real app, you'd send this to your backend API
    }
  };

  const handleAddFile = (newFile) => {
    console.log('Adding file:', newFile);
    // In a real app, you'd send this to your backend API
    setShowAddFileModal(false);
    setSelectedFileClubId(null);
  };

  const handleDeleteFile = (clubId, fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      console.log(`Deleting file ${fileId} from club ${clubId}`);
      // In a real app, you'd send this to your backend API
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Club & File Management</h1>
              <p className="text-purple-100 text-lg">Manage clubs, their gallery, and documents</p>
            </div>
            <FontAwesomeIcon icon={faFolderOpen} className="text-white text-6xl opacity-30" />
          </div>
        </div>
      </header>

      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" 
              />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                placeholder="Search clubs..." 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                <option value="Arts">Arts</option>
                <option value="Technology">Technology</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>
            
            {adminMemberClubId && (
              <button 
                onClick={() => setShowAddClubModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Club
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clubs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <div key={club.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={club.image} 
              alt={club.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{club.name}</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">{club.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{club.category}</span>
                <div className="flex space-x-2">
                  {adminMemberClubId && (
                    <button 
                      onClick={() => {
                        setSelectedClub(club);
                        setShowEditClubModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  {adminMemberClubId && (
                    <button 
                      onClick={() => handleDeleteClub(club.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              </div>

              {/* Gallery */}
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Gallery</h4>
              {club.gallery.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {club.gallery.map(file => (
                    <div key={file.id} className="relative group">
                      <img src={file.url} alt={file.name} className="w-full h-20 object-cover rounded-lg" />
                      {adminMemberClubId && (
                        <button 
                          onClick={() => handleDeleteFile(club.id, file.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mb-4">No gallery images.</p>
              )}
              {adminMemberClubId && (
                <button 
                  onClick={() => {
                    setSelectedFileClubId(club.id);
                    setShowAddFileModal(true);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg mb-4 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Gallery Image
                </button>
              )}

              {/* Documents */}
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Documents</h4>
              {club.documents.length > 0 ? (
                <div className="space-y-2">
                  {club.documents.map(file => (
                    <div key={file.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        <FontAwesomeIcon icon={getFileIcon(file.type)} className="mr-2" />
                        {file.name}
                      </a>
                      {adminMemberClubId && (
                        <button 
                          onClick={() => handleDeleteFile(club.id, file.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No documents.</p>
              )}
              {adminMemberClubId && (
                <button 
                  onClick={() => {
                    setSelectedFileClubId(club.id);
                    setShowAddFileModal(true);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg mt-4 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Document
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClubs.length === 0 && (
        <div className="text-center py-12">
          <FontAwesomeIcon icon={faFolderOpen} className="text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No clubs found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add Club Modal */}
      {showAddClubModal && adminMemberClubId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Club</h3>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleAddClub({
                id: allClubs.length + 1,
                name: e.target.clubName.value,
                category: e.target.clubCategory.value,
                description: e.target.clubDescription.value,
                image: "/img/Club_Placeholder.png",
                gallery: [],
                documents: [],
              });
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
                <input 
                  type="text" 
                  name="clubName"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter club name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  name="clubCategory"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Arts">Arts</option>
                  <option value="Technology">Technology</option>
                  <option value="Strategy">Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="clubDescription"
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter club description"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddClubModal(false)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Club Modal */}
      {showEditClubModal && selectedClub && adminMemberClubId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Club</h3>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleEditClub({
                ...selectedClub,
                name: e.target.clubName.value,
                category: e.target.clubCategory.value,
                description: e.target.clubDescription.value,
              });
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
                <input 
                  type="text" 
                  name="clubName"
                  defaultValue={selectedClub.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  name="clubCategory"
                  defaultValue={selectedClub.category}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Arts">Arts</option>
                  <option value="Technology">Technology</option>
                  <option value="Strategy">Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="clubDescription"
                  defaultValue={selectedClub.description}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowEditClubModal(false)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add File Modal */}
      {showAddFileModal && selectedFileClubId && adminMemberClubId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New File to Club {selectedFileClubId}</h3>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleAddFile({
                clubId: selectedFileClubId,
                name: e.target.fileName.value,
                url: e.target.fileUrl.value,
                type: e.target.fileType.value,
              });
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File Name</label>
                <input 
                  type="text" 
                  name="fileName"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter file name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
                <input 
                  type="url" 
                  name="fileUrl"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter file URL"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                <select 
                  name="fileType"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select file type</option>
                  <option value="image">Image</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddFileModal(false)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}