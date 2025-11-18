import styles from './home.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { useEffect } from 'react';
import { loadIngredientsList } from '../../utils/loadIngredientsList';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(loadIngredientsList({signal: controller.signal}))

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <section className='mt-10'>
          <h2 className='mb-5 text text_type_main-large'>Соберите бургер</h2>

          <BurgerIngredients />
        </section>

        <section className='mt-25'>
          <BurgerConstructor />
        </section>
      </main>
  </DndProvider>
  );
}

export default Home;
