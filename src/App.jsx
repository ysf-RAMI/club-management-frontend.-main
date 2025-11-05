import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicLayout from './pages/public/PublicLayout';
import Home from './pages/public/Home/Home';
import Clubs from './pages/public/Clubs/Clubs';
import ClubDettailes from './pages/public/Clubs/ClubDettailes';
import Events from './pages/public/Events/Events';
import EventDetails from './pages/public/Events/EventDetails';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import Login from './pages/auth/Login';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Register from './pages/auth/Register';
import ProtectedRoutes from './components/security/ProtectedRoutes';
import UserLayout from './components/common/Layout/UserLayout';
import Student from './components/student/Student';
import Member from './components/member/Member';
import Admin from './components/admin/Admin';
import AdMember from './components/admin-member/AdMember';
import ClubManagment from "./components/admin-member/ClubManagment";
import EventManagement from './components/admin-member/EventManagement';
import ClubFilesManagment from './components/admin-member/ClubFilesManagment';

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
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
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<UserLayout />}>
              <Route
                path="/student"
                element={
                  <ProtectedRoutes allowedRoles={['student']}>
                    <Student />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/member"
                element={
                  <ProtectedRoutes allowedRoles={['member']}>
                    <Member />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoutes allowedRoles={['admin']}>
                    <Admin />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/adminMember"
                element={
                  <ProtectedRoutes allowedRoles={['admin-member']}>
                    <AdMember />
                  </ProtectedRoutes>
                }
              >
                <Route path="club-management" element={<ClubManagment />} />
                <Route path="event-management" element={<EventManagement />} />
                <Route path="club-files-management" element={<ClubFilesManagment />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
