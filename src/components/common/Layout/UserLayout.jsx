import DashHeader from './DashHeader';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div>
      <DashHeader />
      <Outlet />
    </div>
  );
}
