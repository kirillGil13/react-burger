import PropTypes from 'prop-types';
import styles from './loader.module.css'

const Loader = ({size}) => {
  return (
    <span className={styles.item} style={{width: size, height: size}} />
  )
}

Loader.propTypes = {
  size: PropTypes.string,
}

export default Loader
