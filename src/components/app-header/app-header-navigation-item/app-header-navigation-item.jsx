import styles from './app-header-navigation-item.module.css';
import PropTypes from 'prop-types';

const AppHeaderNavigationItem = ({ active, onClick, text, IconComponent, ...props}) => {
  const className = [styles.element, active && styles['element_active'], 'pl-5 pr-5 pt-4 pb-4', props.className].join(' ');
  const iconType = active ? 'primary' : 'secondary';
  const textClassName = ['text', 'text_type_main-default', !active && 'text_color_inactive' ].join(' ');

  return (
    <div className={className} onClick={onClick}>
      {!!IconComponent ? <IconComponent className='mr-2' type={iconType} /> : null}

      <span className={textClassName}>{text}</span>
    </div>
  );
}

AppHeaderNavigationItem.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  IconComponent: PropTypes.elementType,
}

export default AppHeaderNavigationItem;