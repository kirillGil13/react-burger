import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';
import PropTypes from 'prop-types';

class BurgerIngredientsItem extends React.Component {
  render() {
    const nameClassName = [styles.name, 'mt-1'].join(' ');

    return (
      <div className={styles.element}>
        <div className='pl-4 pr-4'>
          <img src={this.props.image} alt={this.props.name} />
        </div>

        <div className={nameClassName}>
          <span className='text text_type_digits-default'>{this.props.price}</span>

          <CurrencyIcon type="primary" />
        </div>

        <span className='text text_type_main-default mt-1'>{this.props.name}</span>
      </div>
    )
  }
}

BurgerIngredientsItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

export default BurgerIngredientsItem
