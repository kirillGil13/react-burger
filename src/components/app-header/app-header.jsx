import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderNavigationItem from './app-header-navigation-item/app-header-navigation-item';

const AppHeader = () => {
  const className = [styles.container, 'p-4'].join(' ');

  return (
    <header className={className}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <AppHeaderNavigationItem 
            className='mr-2' 
            text="Конструктор" 
            to='/'
            IconComponent={BurgerIcon}
           />

          <AppHeaderNavigationItem 
            to='/foo'
            text="Лента заказов" 
            IconComponent={ListIcon}
          />
        </nav>

        <Logo className={styles.logo} />

        <AppHeaderNavigationItem 
          text="Личный кабинет"
          to='/profile'
          className={styles.account} 
          IconComponent={ProfileIcon} 
         />
      </div>
    </header>
  );
}

export default AppHeader;