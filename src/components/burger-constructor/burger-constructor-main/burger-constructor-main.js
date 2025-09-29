import React from 'react';
import styles from './burger-constructor-main.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerConstructorMain extends React.Component {
  render() {
    return (
      <ul className={styles.content}>
          {
            this.props.ingredients.map((item) => (
              <li key={item._id}>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))
          }
      </ul>
    )
  }
}

BurgerConstructorMain.propTypes = {
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

export default BurgerConstructorMain
