import React from 'react';
import AppHeaderNavigation from './app-header-navigation/app-header-navigation';
import styles from './app-header.module.css';
import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderNavigationItem from './app-header-navigation-item/app-header-navigation-item';

class AppHeader extends React.Component {
  render() {
    const className = [styles.container, 'p-4'].join(' ');

    return (
      <header className={className}>
        <div className={styles.content}>
          <AppHeaderNavigation />

          <Logo className={styles.logo} />

          <AppHeaderNavigationItem text="Личный кабинет" className={styles.account} IconComponent={ProfileIcon} />
        </div>
      </header>
    );
  }
}

export default AppHeader;