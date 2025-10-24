import styles from './burger-constructor-main.module.css';
import PropTypes from 'prop-types';
import { ConstructorIngredientType } from '../../../utils/types';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

const BurgerConstructorMain = ({ingredients, onDeleteItem, onMoveItem}) => {
  return (
    <ul className={styles.content}>
        {
          ingredients.map((item) => 
            <BurgerConstructorItem 
              key={item.uuid} 
              item={item} 
              moveItem={onMoveItem}
              handleClose={() => onDeleteItem(item.uuid)} 
            />
          )
        }
    </ul>
  )
}

BurgerConstructorMain.propTypes = {
  ingredients: PropTypes.arrayOf(ConstructorIngredientType.isRequired).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onMoveItem: PropTypes.func.isRequired,
}

export default BurgerConstructorMain
