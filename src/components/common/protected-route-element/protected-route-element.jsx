import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import { hasAuth } from '../../../utils/auth';

const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();

  return hasAuth() ? element : <Navigate to="/auth/login" state={{ from: location }} replace/>;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element
}

export default ProtectedRouteElement