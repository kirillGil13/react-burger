import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types'

const ModalOverlay = (props) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default ModalOverlay
