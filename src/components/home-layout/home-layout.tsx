import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout: FC = () => {
  return (
    <Outlet />
  )
}

export default HomeLayout