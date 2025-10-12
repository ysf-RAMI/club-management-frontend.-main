

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faUser, 
    faCog, 
    faShieldAlt, 
    faBell, 
    faCamera,
    faSave,
    faTimes,
    faEdit,
    faCheck,
    faCrown,
    faUsers,
    faChartLine,
    faCalendarAlt,
    faFileAlt,
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faGraduationCap,
    faBuilding
} from "@fortawesome/free-solid-svg-icons"

export default function AdMemberProfile() {
    const [activeTab, setActiveTab] = useState('personal')
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "Sarah",
        lastName: "Johnson", 
        email: "sarah.johnson@university.edu",
        phone: "+1 (555) 123-4567",
        department: "Computer Science",
        bio: "Experienced admin member with a passion for student engagement and club activities. Dedicated to creating meaningful experiences for all students and managing multiple clubs effectively.",
        role: "Club Admin",
        university: "University of Technology",
        graduationYear: "2025",
        clubManaged: "Photography Club",
        eventsCreated: 8,
        membersApproved: 127
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = () => {
        setIsEditing(false)
        // Here you would typically save to API
        console.log('Saving profile data:', formData)
    }

    const handleCancel = () => {
        setIsEditing(false)
        // Reset form data to original values
        setFormData({
            firstName: "Sarah",
            lastName: "Johnson", 
            email: "sarah.johnson@university.edu",
            phone: "+1 (555) 123-4567",
            department: "Computer Science",
            bio: "Experienced admin member with a passion for student engagement and club activities. Dedicated to creating meaningful experiences for all students and managing multiple clubs effectively.",
        role: "Club Admin",
        university: "University of Technology",
        graduationYear: "2025",
        clubManaged: "Photography Club",
        eventsCreated: 8,
        membersApproved: 127
        })
    }

    const tabs = [
        { id: 'personal', label: 'Personal Information', icon: faUser },
        { id: 'account', label: 'Account Settings', icon: faCog },
        { id: 'security', label: 'Security', icon: faShieldAlt },
        { id: 'notifications', label: 'Notifications', icon: faBell }
    ]

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
            <h1 className="text-3xl font-bold mb-2">Club Admin Profile 👑</h1>
            <p className="text-purple-100 text-lg">Manage your Photography Club admin account and oversee club activities</p>
                        </div>
                        <FontAwesomeIcon icon={faCrown} className="text-white text-6xl opacity-30" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-md p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column - Profile Overview */}
                    <div className="lg:col-span-1">
                        {/* Profile Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <img 
                                        src="/img/Club1.png" 
                                        alt="Profile" 
                                        className="w-24 h-24 rounded-full object-cover mx-auto"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                                        <FontAwesomeIcon icon={faCamera} className="text-sm" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{formData.firstName} {formData.lastName}</h3>
                                <p className="text-gray-600 mb-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCrown} className="mr-1 text-purple-500" />
                                    {formData.role}
                                </p>
                                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Active Admin
                                </span>
                            </div>
                        </div>

                        {/* Admin Stats */}
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <FontAwesomeIcon icon={faChartLine} className="mr-2 text-purple-500" />
                                Club Admin Statistics
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Club Managed</span>
                                    <span className="font-bold text-purple-600">{formData.clubManaged}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Events Created</span>
                                    <span className="font-bold text-green-600">{formData.eventsCreated}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Members Approved</span>
                                    <span className="font-bold text-blue-600">{formData.membersApproved}</span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Navigation */}
                        <div className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                                        activeTab === tab.id
                                            ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={tab.icon} className="mr-3 text-sm" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'personal' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                                        <p className="text-gray-600">Update your personal details and contact information</p>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} className="mr-2" />
                                        {isEditing ? 'Save' : 'Edit'}
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Department
                                            </label>
                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                            >
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Engineering">Engineering</option>
                                                <option value="Business">Business</option>
                                                <option value="Arts">Arts</option>
                                                <option value="Science">Science</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Graduation Year
                                            </label>
                                            <input
                                                type="number"
                                                name="graduationYear"
                                                value={formData.graduationYear}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            University
                                        </label>
                                        <input
                                            type="text"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faSave} className="mr-2" />
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Club Admin Privileges</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faUsers} className="text-purple-500 mr-3" />
                                                    <span className="font-medium">Member Management</span>
                                                </div>
                                                <span className="text-green-600 font-medium">Enabled</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-500 mr-3" />
                                                    <span className="font-medium">Event Creation</span>
                                                </div>
                                                <span className="text-green-600 font-medium">Enabled</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faFileAlt} className="text-purple-500 mr-3" />
                                                    <span className="font-medium">File Management</span>
                                                </div>
                                                <span className="text-green-600 font-medium">Enabled</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faUserCheck} className="text-purple-500 mr-3" />
                                                    <span className="font-medium">Member Approval</span>
                                                </div>
                                                <span className="text-green-600 font-medium">Enabled</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Password & Security</h3>
                                        <div className="space-y-4">
                                            <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                                                Change Password
                                            </button>
                                            <button className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                                Enable Two-Factor Authentication
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Notifications</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="font-medium">New Member Requests</span>
                                                    <p className="text-sm text-gray-500">Get notified when new members join</p>
                                                </div>
                                                <input type="checkbox" defaultChecked className="rounded" />
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="font-medium">Event Approvals</span>
                                                    <p className="text-sm text-gray-500">Notifications for event approval requests</p>
                                                </div>
                                                <input type="checkbox" defaultChecked className="rounded" />
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="font-medium">Club Updates</span>
                                                    <p className="text-sm text-gray-500">Important club announcements</p>
                                                </div>
                                                <input type="checkbox" defaultChecked className="rounded" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Help Button */}
            <button className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                <FontAwesomeIcon icon={faCrown} className="text-lg" />
            </button>
        </main>
    )
}