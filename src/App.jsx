import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './pages/public/PublicLayout';
import Home from './pages/public/Home/Home';
import Clubs from './pages/public/Clubs/Clubs';
import ClubDettailes from './pages/public/Clubs/ClubDettailes';
import Events from './pages/public/Events/Events';
import EventDetails from './pages/public/Events/EventDetails';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import Login from './pages/auth/Login';
import Student from './components/student/Student';
import Member from './components/member/Member';
import Admin from './components/admin/Admin';
import AdMember from './components/admin-member/AdMember';
import UserLayout from './components/common/Layout/UserLayout';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/clubs/:id" element={<ClubDettailes />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
          </Route>

          <Route element={<UserLayout />}> 

             <Route path="/student" element={<Student />} />
          <Route path="/member" element={<Member />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admember" element={<AdMember />} />
          </Route>
         
        </Routes>
      </div>
    </Router>
  );
}
