import { memo } from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';
import { IngredientType } from '../../../utils/types';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../../../utils/dragTypes';
import PropTypes from 'prop-types'

const BurgerIngredientsItem = memo(({item, onPickIngredient, count}) => {
  const {name, price, image} = item

  const [, dragRef] = useDrag({
    type: DragTypes.INGREDIENT,
    item,
  })
  
  const nameClassName = [styles.name, 'mt-1'].join(' ');

  const handleOnClick = (e) => {
    e.stopPropagation();
    onPickIngredient(item);
  };

  return (
    <div ref={dragRef} className={styles.element} onClick={handleOnClick}>
      {count && <Counter count={count} size="default" />}

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
  item: IngredientType.isRequired,
  onPickIngredient: PropTypes.func.isRequired,
  count: PropTypes.number
}

export default BurgerIngredientsItem
