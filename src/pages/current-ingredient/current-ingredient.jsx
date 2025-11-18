import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CurrentIngredient = () => {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredientList.list);
  
  const ingredient = useMemo(() => ingredients.find(item => item._id === id), [ingredients, id]);

  if (!ingredient) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-large">Ингредиент не найден</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1>
      <IngredientDetails item={ingredient} />
    </div>
  );
}

export default CurrentIngredient
