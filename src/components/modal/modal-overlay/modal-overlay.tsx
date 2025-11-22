import { FC, MouseEvent, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

interface IProps {
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
}

const ModalOverlay: FC<IProps> = (props) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
}

export default ModalOverlay
