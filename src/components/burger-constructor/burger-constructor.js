import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorMain from './burger-constructor-main/burger-constructor-main';
import PropTypes from 'prop-types'
import { IngredientType } from '../../utils/types';

class BurgerConstructor extends React.Component {
  render() {
    const bun = this.props.data.find((item) => item.type === 'bun')
    const topName = bun.name + ' (верх)'
    const bottomName = bun.name + ' (низ)'

    const ingredients = this.props.data.filter((item) => item.type !== 'bun').slice(0, 5)

    const total = bun.price * 2 + ingredients.reduce((acc, item) => acc + item.price, 0)

    return (
      <section className={styles.container}>
        <div className={styles.content}>
          <ConstructorElement
            type="top"
            isLocked
            text={topName}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.locked}
          />

          <BurgerConstructorMain ingredients={ingredients} />

          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bottomName}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.locked}
          />
        </div>

        <div className={styles.bottom}>
          <div className={styles.total}>
            <span className='text text_type_digits-medium'>{total}</span>

            <CurrencyIcon className={styles.icon} type="primary" />
          </div>

          <Button size='large' type='primary' htmlType='button'>Оформить заказ</Button>
        </div>
    </section>
    )
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
}

export default BurgerConstructor
