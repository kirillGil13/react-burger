import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const refreshToken = localStorage.getItem('refreshToken');  

  return refreshToken ? element : <Navigate to="/auth/login" state={{ from: location }} replace/>;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element
}

export default ProtectedRouteElement