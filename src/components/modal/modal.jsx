import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'

const Modal = ({title, children, opened, onClose}) => {
  useEffect(() => {
    if (!opened) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [opened, onClose]);

  if (!opened) {
    return null;
  }

  const titleClass = [styles.title, 'text text_type_main-medium'].join(' ');

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
        {title && <div className={titleClass}>{title}</div>}

          <div className={styles.close} onClick={onClose}>
            <CloseIcon />
          </div>
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    document.getElementById('modals-root')
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  opened: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal;
