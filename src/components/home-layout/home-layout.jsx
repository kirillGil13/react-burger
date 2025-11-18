import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { loadIngredientsList } from '../../utils/loadIngredientsList';
import { useEffect } from 'react';

const HomeLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(loadIngredientsList({signal: controller.signal}))

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <Outlet />
  )
}

export default HomeLayout