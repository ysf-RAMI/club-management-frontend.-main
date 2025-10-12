import { Outlet } from 'react-router-dom';
import Header from '../../components/common/Layout/Header';
import Footer from '../../components/common/Layout/Footer';

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default PublicLayout;
