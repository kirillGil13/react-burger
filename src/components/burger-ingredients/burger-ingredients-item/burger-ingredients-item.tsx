import { FC, memo, MouseEvent } from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';
import { IIngredient } from '../../../types';
import { useDrag } from 'react-dnd';
import { EDragTypes } from '../../../utils/dragTypes';

interface IProps {
  item: IIngredient,
  onPickIngredient: (item: IIngredient) => void,
  count?: number
}

const BurgerIngredientsItem: FC<IProps> = memo(({item, onPickIngredient, count}) => {
  const {name, price, image} = item

  const [, dragRef] = useDrag<IIngredient>({
    type: EDragTypes.INGREDIENT,
    item,
  })
  
  const nameClassName = [styles.name, 'mt-1'].join(' ');

  const handleOnClick = (e: MouseEvent) => {
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

export default BurgerIngredientsItem
