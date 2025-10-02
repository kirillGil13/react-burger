import React from 'react'
import AppHeaderNavigationItem from '../app-header-navigation-item/app-header-navigation-item';
import styles from './app-header-navigation.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeaderNavigation extends React.Component {
  render() {
    return (
      <nav className={styles.container}>
        <AppHeaderNavigationItem className='mr-2' text="Конструктор" active IconComponent={BurgerIcon} />

        <AppHeaderNavigationItem text="Лента заказов" IconComponent={ListIcon}/>
      </nav>
    )
  }
}

export default AppHeaderNavigation;
