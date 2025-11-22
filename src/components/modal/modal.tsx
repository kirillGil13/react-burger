import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { FC, ReactNode, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
  title?: string;
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
}

const Modal: FC<IProps> = ({title, children, opened, onClose}) => {
  useEffect(() => {
    if (!opened) return;

    const handleEscape = (e: KeyboardEvent) => {
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

  const modalsRoot = document.getElementById('modals-root');

  return modalsRoot && createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
        {title && <div className={titleClass}>{title}</div>}

          <div className={styles.close} onClick={onClose}>
            <CloseIcon type='primary' />
          </div>
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalsRoot
  );
}

export default Modal;
