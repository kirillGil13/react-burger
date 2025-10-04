import styles from './burger-constructor-main.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from '../../../utils/types';

const BurgerConstructorMain = ({ingredients}) => {
  return (
    <ul className={styles.content}>
        {
          ingredients.map((item) => (
            <li key={item._id}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))
        }
    </ul>
  )
}

BurgerConstructorMain.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
}

export default BurgerConstructorMain
