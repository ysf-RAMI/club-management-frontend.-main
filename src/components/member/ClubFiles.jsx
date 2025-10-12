import { useState } from "react"
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
    faEye,
    faCalendarAlt,
    faUser,
    faTimes
} from "@fortawesome/free-solid-svg-icons"

export default function ClubFiles() {
    const [selectedClub, setSelectedClub] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [lightboxImage, setLightboxImage] = useState(null)
    const [showGallery, setShowGallery] = useState(true)
    
    // Sample clubs data
    const clubs = [
        { id: 1, name: "Robotics Club", members: 45, files: 23 },
        { id: 2, name: "Computer Science Club", members: 78, files: 34 },
        { id: 3, name: "Design Club", members: 32, files: 18 },
        { id: 4, name: "Business Club", members: 56, files: 28 }
    ]

    // Sample gallery data
    const galleryImages = [
        {
            id: 1,
            url: "/img/Club1.png",
            title: "Robotics Workshop 2024",
            date: "2024-01-15",
            uploadedBy: "John Doe",
            clubId: 1
        },
        {
            id: 2,
            url: "/img/Club2.png",
            title: "Team Meeting",
            date: "2024-01-10",
            uploadedBy: "Jane Smith",
            clubId: 2
        },
        {
            id: 3,
            url: "/img/Club3.png",
            title: "Project Presentation",
            date: "2024-01-08",
            uploadedBy: "Mike Johnson",
            clubId: 1
        },
        {
            id: 4,
            url: "/img/Club1.png",
            title: "Club Social Event",
            date: "2024-01-05",
            uploadedBy: "Sarah Wilson",
            clubId: 3
        },
        {
            id: 5,
            url: "/img/Club2.png",
            title: "Workshop Materials",
            date: "2024-01-03",
            uploadedBy: "David Brown",
            clubId: 2
        },
        {
            id: 6,
            url: "/img/Club3.png",
            title: "Award Ceremony",
            date: "2023-12-28",
            uploadedBy: "Lisa Davis",
            clubId: 4
        }
    ]

    // Sample documents data
    const documents = [
        {
            id: 1,
            name: "Club Constitution.pdf",
            type: "pdf",
            size: "2.4 MB",
            date: "2024-01-15",
            uploadedBy: "Admin",
            clubId: 1
        },
        {
            id: 2,
            name: "Meeting Minutes.docx",
            type: "word",
            size: "156 KB",
            date: "2024-01-10",
            uploadedBy: "Secretary",
            clubId: 2
        },
        {
            id: 3,
            name: "Budget Report.xlsx",
            type: "excel",
            size: "89 KB",
            date: "2024-01-08",
            uploadedBy: "Treasurer",
            clubId: 1
        },
        {
            id: 4,
            name: "Event Planning.pptx",
            type: "powerpoint",
            size: "3.2 MB",
            date: "2024-01-05",
            uploadedBy: "Event Coordinator",
            clubId: 3
        },
        {
            id: 5,
            name: "Member Guidelines.txt",
            type: "text",
            size: "45 KB",
            date: "2024-01-03",
            uploadedBy: "Admin",
            clubId: 4
        }
    ]

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return faFilePdf
            case 'word': return faFileWord
            case 'excel': return faFileExcel
            case 'powerpoint': return faFilePowerpoint
            case 'text': return faFileAlt
            default: return faFileAlt
        }
    }

    const getFileIconColor = (type) => {
        switch (type) {
            case 'pdf': return 'text-red-500'
            case 'word': return 'text-blue-500'
            case 'excel': return 'text-green-500'
            case 'powerpoint': return 'text-orange-500'
            case 'text': return 'text-gray-500'
            default: return 'text-gray-500'
        }
    }

    // Filter data based on selected club and search term
    const filteredImages = galleryImages.filter(img => 
        (selectedClub === '' || img.clubId.toString() === selectedClub) &&
        img.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredDocuments = documents.filter(doc =>
        (selectedClub === '' || doc.clubId.toString() === selectedClub) &&
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const LightboxModal = ({ image, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <img
                    src={image.url}
                    alt={image.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                    <h3 className="text-lg font-bold">{image.title}</h3>
                    <p className="text-sm text-gray-300">
                        Uploaded by {image.uploadedBy} on {image.date}
                    </p>
                </div>
            </div>
        </div>
    )

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Club Files</h1>
                            <p className="text-purple-100 text-lg">View and manage club files and images</p>
                        </div>
                        <FontAwesomeIcon icon={faFolder} className="text-white text-6xl opacity-30" />
                    </div>
                </div>
            </header>

            {/* Club Selection Gallery */}
           

            {/* Files Content - Single Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <label htmlFor="select-club" className="text-gray-700 font-medium min-w-max">
                            <FontAwesomeIcon icon={faFolder} className="text-purple-600 mr-1" /> Select Club:
                        </label>
                        <select
                            id="select-club"
                            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white text-gray-700 transition"
                            value={selectedClub}
                            onChange={e => setSelectedClub(e.target.value)}
                        >
                            <option value="">All Clubs</option>
                            {clubs.map(club => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </select>
                    </div>
                    
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
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                placeholder="Search files and images..." 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {selectedClub ? 
                            `${clubs.find(c => c.id.toString() === selectedClub)?.name} Files` : 
                            'All Club Files'
                        }
                    </h2>
                    <div className="text-sm text-gray-500">
                        {filteredImages.length} images • {filteredDocuments.length} documents
                    </div>
                </div>

                {/* Images Section */}
                
                {/* Horizontal Switcher for Gallery or Documents */}
                <div className="flex items-center space-x-4 mb-8">
                    <button
                        onClick={() => setShowGallery(true)}
                        className={`flex items-center px-5 py-2 rounded-lg font-medium transition 
                            ${showGallery ? "bg-purple-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-purple-100"}`}
                    >
                        <FontAwesomeIcon icon={faImage} className="mr-2" />
                        Gallery
                    </button>
                    <button
                        onClick={() => setShowGallery(false)}
                        className={`flex items-center px-5 py-2 rounded-lg font-medium transition 
                            ${!showGallery ? "bg-purple-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-purple-100"}`}
                    >
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                        Documents
                    </button>
                </div>

                {/* Gallery or Documents Section */}
                {showGallery ? (
                    filteredImages.length > 0 ? (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                <FontAwesomeIcon icon={faImage} className="mr-2 text-purple-500" />
                                Images ({filteredImages.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredImages.map(image => (
                                    <div 
                                        key={image.id}
                                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
                                        onClick={() => setLightboxImage(image)}
                                    >
                                        <div className="relative">
                                            <img 
                                                src={image.url} 
                                                alt={image.title}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                                                    {clubs.find(c => c.id === image.clubId)?.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-medium text-gray-800 mb-1 text-sm line-clamp-2">{image.title}</h4>
                                            <div className="flex items-center text-xs text-gray-500 mb-1">
                                                <FontAwesomeIcon icon={faUser} className="mr-1" />
                                                {image.uploadedBy}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                {image.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FontAwesomeIcon icon={faImage} className="text-gray-300 text-6xl mb-4" />
                            <h3 className="text-xl font-medium text-gray-500 mb-2">No images found</h3>
                            <p className="text-gray-400">
                                {selectedClub ? 
                                    `No images found for ${clubs.find(c => c.id.toString() === selectedClub)?.name}` : 
                                    'No images found matching your search'
                                }
                            </p>
                        </div>
                    )
                ) : (
                    filteredDocuments.length > 0 ? (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-purple-500" />
                                Documents ({filteredDocuments.length})
                            </h3>
                            <div className="space-y-3">
                                {filteredDocuments.map(doc => (
                                    <div key={doc.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-3 rounded-lg ${getFileIconColor(doc.type)} bg-white`}>
                                                    <FontAwesomeIcon icon={getFileIcon(doc.type)} className="text-xl" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                                                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                                                        <span>{doc.size}</span>
                                                        <span>•</span>
                                                        <span>{clubs.find(c => c.id === doc.clubId)?.name}</span>
                                                        <span>•</span>
                                                        <span>Uploaded by {doc.uploadedBy}</span>
                                                        <span>•</span>
                                                        <span>{doc.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-200">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                                <button className="text-purple-500 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50">
                                                    <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FontAwesomeIcon icon={faFileAlt} className="text-gray-300 text-6xl mb-4" />
                            <h3 className="text-xl font-medium text-gray-500 mb-2">No documents found</h3>
                            <p className="text-gray-400">
                                {selectedClub ? 
                                    `No documents found for ${clubs.find(c => c.id.toString() === selectedClub)?.name}` : 
                                    'No documents found matching your search'
                                }
                            </p>
                        </div>
                    )
                )}

                {/* Empty State */}
                {filteredImages.length === 0 && filteredDocuments.length === 0 && (
                    <div className="text-center py-12">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-300 text-6xl mb-4" />
                        <h3 className="text-xl font-medium text-gray-500 mb-2">No files found</h3>
                        <p className="text-gray-400">
                            {selectedClub ? 
                                `No files found for ${clubs.find(c => c.id.toString() === selectedClub)?.name}` : 
                                'No files found matching your search'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <LightboxModal 
                    image={lightboxImage} 
                    onClose={() => setLightboxImage(null)} 
                />
            )}
        </main>
    )
}
