import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-tabs.module.css';

const BurgerIngredientsTabs = () => {
  return (
    <div className={styles.container}>
      <Tab active>
        Булки
      </Tab>
      <Tab>
        Соусы
      </Tab>
      <Tab>
        Начинки
      </Tab>
    </div>
  )
}

export default BurgerIngredientsTabs
