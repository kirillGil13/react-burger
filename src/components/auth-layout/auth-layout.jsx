import { Navigate, Outlet } from 'react-router-dom';
import styles from './auth-layout.module.css'
import { hasAuth } from '../../utils/auth';

const AuthLayout = () => {
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