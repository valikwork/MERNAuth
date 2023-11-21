import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN_ROUTE } from '../../../frontend/src/constants/routes';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace />;
};
export default PrivateRoute;