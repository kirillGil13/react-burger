import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorIngredientType } from '../../../utils/types';
import { useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '../../../utils/dragTypes';
import PropTypes from 'prop-types'
import { useRef } from 'react';

const BurgerConstructorItem = ({item, handleClose, moveItem}) => {
  const ref = useRef(null);

  const [, drag] = useDrag({
    type: DragTypes.INGREDIENT_ADDED,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{isHovered}, drop] = useDrop({
    accept: DragTypes.INGREDIENT_ADDED,
    drop: (dragItem) => {
      if (dragItem.uuid === item.uuid) return

      moveItem(dragItem, item)
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver()
    })
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={styles.item} style={{borderTop: isHovered ? '1px solid white' : ''}}>
      <DragIcon className={styles.drag}  />

      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  item: ConstructorIngredientType.isRequired,
  handleClose: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired
}

export default BurgerConstructorItem
