import { NavLink } from 'react-router-dom';
import styles from './app-header-navigation-item.module.css';
import { ElementType, FC } from 'react';

interface IProps {
  text: string;
  to: string;
  IconComponent?: ElementType;
  className?: string;
}

const AppHeaderNavigationItem: FC<IProps> = ({ text, IconComponent, ...props}) => {
  const getIconType = (active: boolean) => {
    return active ? 'primary' : 'secondary';
  }

  const getTextClassName = (active: boolean) => {
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

export default AppHeaderNavigationItem;