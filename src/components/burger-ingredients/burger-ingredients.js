import React from 'react'
import styles from './burger-ingredients.module.css';
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import PropTypes from 'prop-types';
import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';

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
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string
  })),
}

export default BurgerIngredients
