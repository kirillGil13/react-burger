import styles from './burger-constructor-main.module.css';
import { IConstructorIngredient } from '../../../utils/types';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { FC } from 'react';

interface IProps {
  ingredients: IConstructorIngredient[];
  onDeleteItem: (uuid: IConstructorIngredient['uuid']) => void;
  onMoveItem: (dragItem: IConstructorIngredient, dropItem: IConstructorIngredient) => void;
}

const BurgerConstructorMain: FC<IProps> = ({ingredients, onDeleteItem, onMoveItem}) => {
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

export default BurgerConstructorMain
