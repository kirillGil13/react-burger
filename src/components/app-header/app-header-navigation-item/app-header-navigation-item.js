import styles from './app-header-navigation-item.module.css';
import React from 'react';
import PropTypes from 'prop-types';

class AppHeaderNavigationItem extends React.Component {
  render() {
    const { active, onClick, text, IconComponent} = this.props;

    const className = [styles.element, active && styles['element_active'], 'pl-5 pr-5 pt-4 pb-4', this.props.className].join(' ');
    const iconType = active ? 'primary' : 'secondary';
    const textClassName = ['text', 'text_type_main-default', !active && 'text_color_inactive' ].join(' ');

    return (
      <div className={className} onClick={onClick}>
        {!!IconComponent ? <IconComponent className='mr-2' type={iconType} /> : null}

        <span className={textClassName}>{text}</span>
      </div>
    );
  }
}

AppHeaderNavigationItem.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  IconComponent: PropTypes.elementType,
}

AppHeaderNavigationItem.defaultProps = {
  text: '',
  active: false,
  onClick: () => {},
  className: '',
  IconComponent: null,
}

export default AppHeaderNavigationItem;