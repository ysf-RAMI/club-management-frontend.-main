
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faClock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MemberClubs() {
    const [joinedClubs, setJoinedClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubs = () => {
            setTimeout(() => {
                try {
                    const mockClubs = [
                        { id: '1', name: 'Club 1', members: 10, imageUrl: 'https://picsum.photos/200/300' },
                        { id: '2', name: 'Club 2', members: 15, imageUrl: 'https://picsum.photos/200/300' },
                        { id: '3', name: 'Club 3', members: 20, imageUrl: 'https://picsum.photos/200/300' },
                    ];
                    setJoinedClubs(mockClubs);
                    setIsLoading(false);
                } catch (err) {
                    setError('Failed to fetch clubs.');
                    setIsLoading(false);
                }
            }, 1000);
        };
        fetchClubs();
    }, []);

 

    if (isLoading) {
        return <p>Loading clubs...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-2">
            <main>
                <div className="flex justify-between items-center">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg mb-8 flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">My Clubs</h1>
                            <p className="text-purple-100 text-lg">Manage and view your joined clubs</p>
                        </div>
                        <FontAwesomeIcon icon={faGraduationCap} className="text-white text-6xl opacity-30" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative w-1/3">
                            <input
                                type="text"
                                placeholder="Search clubs..."
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            <option value="technology">Technology</option>
                            <option value="sports">Sports</option>
                            <option value="arts">Arts</option>
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
                                        className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wide"
                                    >
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {joinedClubs.map((club) => (
                                    <tr key={club.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={club.imageUrl} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{club.name}</div>
                                                    <div className="text-xs text-gray-500">Club Description</div> {/* Placeholder for description */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{club.members}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">0</td> {/* Placeholder for events */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td> {/* Placeholder for status */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-medium">
                                            <a
                                                href={`/clubs/${club.id}`}      
                                                className="text-purple-600 px-4 py-2 rounded-lg hover:text-purple-700 font-medium"
                                            >
                                                View
                                            </a>
                                            
                                           
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                      </div>
            </main>
        </div>
    );
}
