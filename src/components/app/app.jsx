import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data';

function App() {
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
