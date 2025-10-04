import { memo } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';
import { IngredientType } from '../../../utils/types';

const BurgerIngredientsItem = memo(({item, onPickIngredient}) => {
  const {name, price, image} = item
  
  const nameClassName = [styles.name, 'mt-1'].join(' ');
  const handleOnClick = (e) => {
    e.stopPropagation();
    onPickIngredient(item);
  };

  return (
    <div className={styles.element} onClick={handleOnClick}>
      <div className='pl-4 pr-4'>
        <img src={image} alt={name} />
      </div>

      <div className={nameClassName}>
        <span className='text text_type_digits-default'>{price}</span>

        <CurrencyIcon type="primary" />
      </div>

      <span className='text text_type_main-default mt-1'>{name}</span>
    </div>
  )
})

BurgerIngredientsItem.propTypes = {
  item: IngredientType
}

export default BurgerIngredientsItem
