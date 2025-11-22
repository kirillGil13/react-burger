import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { CurrentIngredient, CurrentOrder, ForgotPassword, Home, Login, NotFound, Orders, Profile, Register, ResetPassword } from '../../pages';
import AuthLayout from '../auth-layout/auth-layout';
import ProfileLayout from '../profile-layout/profile-layout';
import ProtectedRouteElement from '../common/protected-route-element/protected-route-element';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../utils/auth';
import { ReactElement, useEffect } from 'react';
import ModalLayout from '../modal-layout/modal-layout';
import HomeLayout from '../home-layout/home-layout';
import { loadIngredientsList } from '../../utils/loadIngredientsList';

function AppRoutes(): ReactElement {
  const location = useLocation();
  const background = location.state?.modal;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="ingredients/:id" element={<CurrentIngredient />} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfileLayout />} />} >
          <Route index element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<CurrentOrder />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={<ModalLayout />}
          />
        </Routes>
      )}
    </>
  );
}

function App(): ReactElement {
  // TODO
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const controller = new AbortController();
    
    dispatch(fetchUser({signal: controller.signal}))

    return () => {
      controller.abort();
    };
  }, [dispatch])

  useEffect(() => {
    const controller = new AbortController();

    dispatch(loadIngredientsList({signal: controller.signal}))

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
      <AppHeader />

      <AppRoutes />      
    </div>
    </Router>
  );
}

export default App;
