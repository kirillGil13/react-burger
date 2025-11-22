import { NavLink } from 'react-router-dom';
import styles from './app-header-navigation-item.module.css';
import PropTypes from 'prop-types';

const AppHeaderNavigationItem = ({ active, onClick, text, IconComponent, ...props}) => {
  const getIconType = (active) => {
    return active ? 'primary' : 'secondary';
  }

  const getTextClassName = (active) => {
    return `text text_type_main-default ${active ? 'text_color_primary' : 'text_color_inactive'}`;
  }

  return (
    <NavLink to={props.to} className={`${styles.element} pl-5 pr-5 pt-4 pb-4 ${props.className}`}>
      {({ isActive }) => (
          <>
            {!!IconComponent ? <IconComponent className='mr-2' type={getIconType(isActive)} /> : null}

            <span className={getTextClassName(isActive)}>{text}</span>
          </>
        )}
    </NavLink>
  );
}

AppHeaderNavigationItem.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  IconComponent: PropTypes.elementType,
}

export default AppHeaderNavigationItem;