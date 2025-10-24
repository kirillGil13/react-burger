import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { useEffect } from 'react';
import { loadIngredientsList } from '../../utils/loadIngredientsList';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
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
      <div className={styles.app}>
        <AppHeader />
        
          <main className={styles.main}>
            <section className='mt-10'>
              <h2 className='mb-5 text text_type_main-large'>Соберите бургер</h2>

              <BurgerIngredients />
            </section>

            <section className='mt-25'>
              <BurgerConstructor />
            </section>
          </main>
      </div>
    </DndProvider>
  );
}

export default App;
