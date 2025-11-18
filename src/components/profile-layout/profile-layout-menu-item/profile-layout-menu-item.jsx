import styles from './profile-layout-menu-item.module.css';
import PropTypes from 'prop-types';

const ProfileLayoutMenuItem = ({ active, onClick, text, ...props}) => {
  const textClassName = ['text', 'text_type_main-medium', !active && 'text_color_inactive' ].join(' ');

  return (
    <li className={`${styles.content} ${props.className}`} onClick={onClick}>
      <span className={textClassName}>{text}</span>
    </li>
  );
}

ProfileLayoutMenuItem.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default ProfileLayoutMenuItem;