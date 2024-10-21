import { Outlet } from 'react-router-dom'
import { useToken } from '../../hooks/useToken';
import RestrictedPage from './RestrictedPage';

const ProtectedRoute = () => {

  const {data, isLoading, isError, } = useToken()

  if (isLoading){
    return <div>Loading...</div>
  }

  if (isError){
    return <div>Error...</div>
  }


  if (!data){
    return <RestrictedPage />
  }

  
  return (
    <Outlet />
  )
}

export default ProtectedRoute