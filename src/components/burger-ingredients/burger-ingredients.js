import React from 'react'
import styles from './burger-ingredients.module.css';
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import PropTypes from 'prop-types';
import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import { IngredientType } from '../../utils/types';

class BurgerIngredients extends React.Component {
  render() {
    const mainData = this.props.data.filter((item) => item.type === 'main');
    const sauceData = this.props.data.filter((item) => item.type === 'sauce');
    const bunData = this.props.data.filter((item) => item.type === 'bun');

    return (
      <section className={styles.container}>
        <BurgerIngredientsTabs />

        <div className={styles.content}>
          <BurgerIngredientsSection title='Булки'>
            {bunData.map((item) => <BurgerIngredientsItem key={item._id} {...item} />)}
          </BurgerIngredientsSection>

          <BurgerIngredientsSection title='Соусы'>
            {sauceData.map((item) => <BurgerIngredientsItem key={item._id} {...item} />)}
          </BurgerIngredientsSection>

          <BurgerIngredientsSection title='Начинки'>
            {mainData.map((item) => <BurgerIngredientsItem key={item._id} {...item} />)}
          </BurgerIngredientsSection>
        </div>
      </section>
    )
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
}

export default BurgerIngredients
