import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './burger-ingredients.module.css';
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../services/currentIngredient';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('bun')
  
  const data = useSelector((store) => store.ingredientList.list);
  const constructorIngredients = useSelector((store) => store.constructorIngredients.list);

  const mainData = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
  const sauceData = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);
  const bunData = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);

  const countMap = useMemo(() => constructorIngredients.reduce((acc, item) => {
    acc[item._id] = (acc[item._id] || 0) + 1
    return acc
  }, {}), [constructorIngredients])

  const { ref: bunRef, inView: bunInView } = useInView({ threshold: 0 })
  const { ref: sauceRef, inView: sauceInView } = useInView({ threshold: 0 })
  const { ref: mainRef, inView: mainInView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (bunInView) {
      setCurrentTab('bun')
    } else if (sauceInView) {
      setCurrentTab('sauce')
    } else if (mainInView) {
      setCurrentTab('main')
    }
  }, [bunInView, sauceInView, mainInView])

  const onTabClick = useCallback((tab) => {
    const element = document.getElementById(tab)    
    if (element) element.scrollIntoView({behavior: 'smooth'})
  }, [])

  const pickIngredient = useCallback((item) => {
    dispatch(setCurrentIngredient(item))    
    navigate(`/ingredients/${item._id}`, { state: { modal: true } })
  }, [navigate, dispatch])

  return (
    <section className={styles.container}>
      <BurgerIngredientsTabs currentTab={currentTab} onTabClick={onTabClick} />

      <div className={styles.content}>
        <BurgerIngredientsSection id='bun' title='Булки' ref={bunRef}>
          {bunData.map((item) => <BurgerIngredientsItem key={item._id} item={item} count={countMap[item._id]} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>

        <BurgerIngredientsSection id='sauce' title='Соусы' ref={sauceRef}>
          {sauceData.map((item) => <BurgerIngredientsItem key={item._id} item={item} count={countMap[item._id]} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>

        <BurgerIngredientsSection id='main' title='Начинки' ref={mainRef}>
          {mainData.map((item) => <BurgerIngredientsItem key={item._id} item={item} count={countMap[item._id]} onPickIngredient={pickIngredient} />)}
        </BurgerIngredientsSection>
      </div>
    </section>
  )
}

export default BurgerIngredients
