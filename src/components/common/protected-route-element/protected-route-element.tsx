import { Navigate, useLocation } from 'react-router-dom';
import { hasAuth } from '../../../utils/auth';
import { FC, ReactElement } from 'react';

interface IProps {
  element: ReactElement
}

const ProtectedRouteElement: FC<IProps> = ({ element }) => {
  const location = useLocation();

  return hasAuth() ? element : <Navigate to="/login" state={{ from: location }} replace/>;
}

export default ProtectedRouteElement