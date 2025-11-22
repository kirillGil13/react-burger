import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './current-ingredient.module.css';
import { IIngredient } from '../../types';
import { useAppSelector } from '../../hooks/hooks';

const CurrentIngredient: FC = () => {
  const { id } = useParams();
  // TODO
  const data = useAppSelector<any, any[]>((store) => store.ingredientList.list);

  const currentIngredient = useMemo<IIngredient>(() => data.find(item => item._id === id), [data, id]);

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