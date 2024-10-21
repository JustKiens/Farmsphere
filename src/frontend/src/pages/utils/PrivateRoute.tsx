import { Outlet } from 'react-router-dom'
import { useRole } from '../../hooks/useRole';
import RestrictedPage from './RestrictedPage';

type PrivateRouteProps = {
  role: string
}

const PrivateRoute = ({
  role
}:PrivateRouteProps ) => {


  const { data, isLoading, isError } = useRole()


  if (isError){
    return <main>Error</main>
  }

  if (isLoading){
    return <main>Loading...</main>
  }

  if (data !== role ){
    return <RestrictedPage />
  }


  return (
    <Outlet />
  )
}

export default PrivateRoute