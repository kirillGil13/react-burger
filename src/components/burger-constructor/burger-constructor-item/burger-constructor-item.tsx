import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorIngredient } from '../../../utils/types';
import { useDrag, useDrop } from 'react-dnd';
import { EDragTypes } from '../../../utils/dragTypes';
import { FC, useRef } from 'react';

interface IProps {
  item: IConstructorIngredient
  handleClose: () => void
  moveItem: (dragItem: IConstructorIngredient, dropItem: IConstructorIngredient) => void
}

const BurgerConstructorItem: FC<IProps> = ({item, handleClose, moveItem}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag<IConstructorIngredient, IConstructorIngredient, {isDragging: boolean}>({
    type: EDragTypes.INGREDIENT_ADDED,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{isHovered}, drop] = useDrop<IConstructorIngredient, IConstructorIngredient, {isHovered: boolean}>({
    accept: EDragTypes.INGREDIENT_ADDED,
    drop: (dragItem) => {
      if (dragItem.uuid === item.uuid) return

      moveItem(dragItem, item)

      return dragItem
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver()
    })
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={styles.item} style={{borderTop: isHovered ? '1px solid white' : ''}}>
      <DragIcon className={styles.drag} type='primary'  />

      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </li>
  )
}

export default BurgerConstructorItem
