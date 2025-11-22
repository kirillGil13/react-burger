import PropTypes from 'prop-types'

const ErrorItem = ({ error }) => {
  return (
    <span className='text text_type_main-default text_color_inactive' style={{color: 'red'}}>{error}</span>
  );
}

ErrorItem.propTypes = {
  error: PropTypes.string
}

export default ErrorItem