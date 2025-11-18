import { IngredientType } from '../../utils/types';
import styles from './ingredient-details.module.css'

const IngredientDetails = ({item}) => {
  const listClassName = [styles.list, 'text text_type_main-default text_color_inactive mt-8'].join(' ');

  return (
    <div className={styles.container}>
      <img src={item?.image_large} alt={item?.name} />
      <p className='text text_type_main-medium mt-4'>{item?.name}</p>
      <ul className={listClassName}>
        <li>
          <div>Калории,ккал</div>
          <div className='text text_type_digits-default'>{item?.calories}</div>
        </li>
        <li>
          <div>Белки, г</div> 
          <div className='text text_type_digits-default'>{item?.proteins}</div>
        </li>
        <li>
          <div>Жиры, г</div>
          <div className='text text_type_digits-default'>{item?.fat}</div>
        </li>
        <li>
          <div>Углеводы, г</div>
          <div className='text text_type_digits-default'>{item?.carbohydrates}</div>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  item: IngredientType
}

export default IngredientDetails
