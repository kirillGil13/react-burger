import { Navigate, Outlet } from 'react-router-dom';
import styles from './auth-layout.module.css'
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    return (
      <Navigate to="/" replace />
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <Outlet />
      </section>
    </main>
  )
}

export default AuthLayout