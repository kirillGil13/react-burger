import { useCallback, useState } from 'react'
import styles from './burger-ingredients.module.css';
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import PropTypes from 'prop-types';
import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import { IngredientType } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = ({data}) => {
  const mainData = data.filter((item) => item.type === 'main');
  const sauceData = data.filter((item) => item.type === 'sauce');
  const bunData = data.filter((item) => item.type === 'bun');
  const [opened, setOpened] = useState(false)
  const [pickedItem, setPickedItem] = useState(null)

  const closeModal = useCallback(() => {
    setOpened(false)
    setPickedItem(null)
  }, [])

  const pickIngredient = useCallback((item) => {
    setPickedItem(item)
    setOpened(true)
  }, [])

  const modal = (
    <Modal title='Детали ингредиента' opened={opened} onClose={closeModal}>
      <IngredientDetails item={pickedItem} />
    </Modal>
  )

  return (
    <section className={styles.container}>
      <BurgerIngredientsTabs />

      <div className={styles.content} onClick={() => setOpened(true)}>
        <BurgerIngredientsSection title='Булки'>
          {bunData.map((item) => <BurgerIngredientsItem key={item._id} item={item} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>

        <BurgerIngredientsSection title='Соусы'>
          {sauceData.map((item) => <BurgerIngredientsItem key={item._id} item={item} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>

        <BurgerIngredientsSection title='Начинки'>
          {mainData.map((item) => <BurgerIngredientsItem key={item._id} item={item} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>
      </div>

      {modal}
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
}

export default BurgerIngredients
