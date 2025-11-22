import { Navigate, Outlet } from 'react-router-dom';
import styles from './auth-layout.module.css'
import { hasAuth } from '../../utils/auth';
import { FC } from 'react';

const AuthLayout: FC = () => {
  if (hasAuth()) {
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