import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderNavigationItem from './app-header-navigation-item/app-header-navigation-item';
import { useLocation, useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const className = [styles.container, 'p-4'].join(' ');
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={className}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <AppHeaderNavigationItem 
            className='mr-2' 
            text="Конструктор" 
            active={location.pathname === '/'} 
            IconComponent={BurgerIcon}
            onClick={() => navigate('/')}
           />

          <AppHeaderNavigationItem 
            active={location.pathname === '/foo'} 
            text="Лента заказов" 
            IconComponent={ListIcon}
            onClick={() => navigate('/foo')}
          />
        </nav>

        <Logo className={styles.logo} />

        <AppHeaderNavigationItem 
          text="Личный кабинет"
          active={location.pathname.includes('/profile')} 
          className={styles.account} 
          IconComponent={ProfileIcon} 
          onClick={() => navigate('/profile')}
         />
      </div>
    </header>
  );
}

export default AppHeader;