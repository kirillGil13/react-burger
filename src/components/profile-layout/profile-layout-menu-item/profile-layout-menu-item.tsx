import { FC } from 'react';
import styles from './profile-layout-menu-item.module.css';

interface IProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const ProfileLayoutMenuItem: FC<IProps> = ({ active, onClick, text, className}) => {
  const textClassName = ['text', 'text_type_main-medium', !active && 'text_color_inactive' ].join(' ');

  return (
    <li className={`${styles.content} ${className}`} onClick={onClick}>
      <span className={textClassName}>{text}</span>
    </li>
  );
}

export default ProfileLayoutMenuItem;