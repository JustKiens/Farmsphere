import { Outlet } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';
import RestrictedPage from './RestrictedPage';

const PublicRoute = () => {
  const { data: role, isLoading, isError } = useRole();

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <div>Error fetching role. Please try again.</div>; // Handle error gracefully
  }


  if (role === null) {
    return <Outlet />
  }

  if (role === "provider" || role === "admin" ) {
    return <RestrictedPage />
  }

  return <Outlet />;
};



export default PublicRoute;