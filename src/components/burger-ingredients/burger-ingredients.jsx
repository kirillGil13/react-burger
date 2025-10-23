import { useCallback, useMemo, useState } from 'react'
import styles from './burger-ingredients.module.css';
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentIngredient, setCurrentIngredient } from '../../services/currentIngredient';

const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState('bun')
  const [opened, setOpened] = useState(false)
  
  const currentIngredient = useSelector((store) => store.currentIngredient.item);
  const data = useSelector((store) => store.ingredientList.list);
  const constructorIngredients = useSelector((store) => store.constructorIngredients.list);

  const mainData = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
  const sauceData = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);
  const bunData = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);

  const countMap = useMemo(() => constructorIngredients.reduce((acc, item) => {
    acc[item._id] = (acc[item._id] || 0) + 1
    return acc
  }, {}), [constructorIngredients])

  const onTabClick = useCallback((tab) => {
    setCurrentTab(tab)    

    const element = document.getElementById(tab)    
    if (element) element.scrollIntoView({behavior: 'smooth'})
  }, [])

  const closeModal = useCallback(() => {
    setOpened(false)
    dispatch(deleteCurrentIngredient())
  }, [dispatch])

  const pickIngredient = useCallback((item) => {
    dispatch(setCurrentIngredient(item))
    setOpened(true)
  }, [dispatch])

  const modal = (
    <Modal title='Детали ингредиента' opened={opened} onClose={closeModal}>
      <IngredientDetails item={currentIngredient} />
    </Modal>
  )

  return (
    <section className={styles.container}>
      <BurgerIngredientsTabs currentTab={currentTab} onTabClick={onTabClick} />

      <div className={styles.content}>
        <BurgerIngredientsSection id='bun' title='Булки'>
          {bunData.map((item) => <BurgerIngredientsItem key={item._id} item={item} count={countMap[item._id]} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>

        <BurgerIngredientsSection id='sauce' title='Соусы'>
          {sauceData.map((item) => <BurgerIngredientsItem key={item._id} item={item} count={countMap[item._id]} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>

        <BurgerIngredientsSection id='main' title='Начинки'>
          {mainData.map((item) => <BurgerIngredientsItem key={item._id} item={item} count={countMap[item._id]} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>
      </div>

      {modal}
    </section>
  )
}

export default BurgerIngredients
