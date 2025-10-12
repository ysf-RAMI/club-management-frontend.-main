import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSearch, faTag, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Header from '../common/Header';

const mockClubs = [
    { id: '1', name: 'Robotics Club', members: 89, imageUrl: '/img/Club2.png', category: 'Technology' },
    { id: '2', name: 'Debate Society', members: 45, imageUrl: '/img/Club3.png', category: 'Arts' },
    { id: '3', name: 'Photography Club', members: 127, imageUrl: '/img/Club1.png', category: 'Arts' },
    { id: '4', name: 'Art & Creativity Club', members: 64, imageUrl: '/img/Club4.png', category: 'Arts' },
];

export default function MemberClubs() {
    const [clubs, setClubs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        // Simulating API call
        setClubs(mockClubs);
    }, []);

    const filteredClubs = clubs.filter(club => {
        const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || club.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <Header 
                title="My Clubs" 
                subtitle="Manage and view your joined clubs"
                icon={faGraduationCap} 
            />

            <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search clubs..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <div className="relative">
                        <select
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 cursor-pointer"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Sports">Sports</option>
                            <option value="Arts">Arts</option>
                        </select>
                        <FontAwesomeIcon icon={faTag} className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClubs.map(club => (
                    <div key={club.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img src={club.imageUrl} alt={club.name} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{club.name}</h3>
                            <div className="flex items-center text-gray-600 mb-4">
                                <FontAwesomeIcon icon={faUsers} className="mr-2"/>
                                <span>{club.members} members</span>
                            </div>
                            <button className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300">
                                View Club
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
