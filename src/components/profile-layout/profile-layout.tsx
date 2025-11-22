import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProfileLayoutMenuItem from './profile-layout-menu-item/profile-layout-menu-item';
import styles from './profile-layout.module.css'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../services/user';
import { FC } from 'react';

const ProfileLayout: FC = () => {
  const route = useLocation();
  const navigate = useNavigate()
  // TODO
  const dispatch = useDispatch<any>()

  const signOut = () => {
    localStorage.removeItem('refreshToken');
    dispatch(deleteUser());
    navigate('/login');
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <ProfileLayoutMenuItem active={route.pathname === '/profile/info'} text="Профиль" onClick={() => navigate('/profile/info')} />
            <ProfileLayoutMenuItem active={route.pathname === '/profile/orders'} text="История заказов" onClick={() => navigate('/profile/orders')} />
            <ProfileLayoutMenuItem text="Выход" onClick={signOut} />
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
        </nav>

        <Outlet />
      </div>
    </section>
  )
}

export default ProfileLayout