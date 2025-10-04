import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { useEffect, useState } from 'react';
import {API_URL} from '../../utils/constants';

function App() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL + '/ingredients', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();

        setData(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      
      <main className={styles.main}>
        <section className='mt-10'>
          <h2 className='mb-5 text text_type_main-large'>Соберите бургер</h2>

          <BurgerIngredients data={data}/>
        </section>

        <section className='mt-25'>
          <BurgerConstructor data={data} />
        </section>
      </main>
    </div>
  );
}

export default App;
