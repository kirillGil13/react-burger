import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './current-ingredient.module.css';

const CurrentIngredient = () => {
  const { id } = useParams();
  const data = useSelector((store) => store.ingredientList.list);

  const currentIngredient = useMemo(() => data.find(item => item._id === id), [data, id]);

  if (!currentIngredient) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-large">Ингредиент не найден</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1>
      <IngredientDetails item={currentIngredient} />
    </div>
  );
}

export default CurrentIngredient