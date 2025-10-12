import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Layout/Header';
import Footer from './components/common/Layout/Footer';
import Home from './pages/public/Home/Home';
import Clubs from './pages/public/Clubs/Clubs';
import ClubDettailes from './pages/public/Clubs/ClubDettailes';
import Events from './pages/public/Events/Events';
import EventDetails from './pages/public/Events/EventDetails';
import Login from './pages/auth/Login';
import Student from './components/student/Student';
import Member from './components/member/Member';
import Admin from './components/admin/Admin';
import AdMember from './components/admin-member/AdMember';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubDettailes />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/student" element={<Student />} />
          <Route path="/member" element={<Member />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admember" element={<AdMember />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
