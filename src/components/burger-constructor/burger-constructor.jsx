import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorMain from './burger-constructor-main/burger-constructor-main';
import PropTypes from 'prop-types'
import { IngredientType } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useCallback, useState } from 'react';

const createEmptyItem = () => {
  return {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: ''
  }
}

const BurgerConstructor = ({data}) => {
  const [opened, setOpened] = useState(false)

  const bun = data.find((item) => item.type === 'bun') ?? createEmptyItem()
  const topName = bun.name + ' (верх)'
  const bottomName = bun.name + ' (низ)'

  const ingredients = data.filter((item) => item.type !== 'bun').slice(0, 5)

  const total = bun.price * 2 + ingredients.reduce((acc, item) => acc + item.price, 0)

  const closeModal = useCallback(() => {
    setOpened(false)
  }, [])

  const openModal = useCallback(() => {
    setOpened(true)
  }, [])

  const modal = (
    <Modal opened={opened} onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

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

        <Button size='large' type='primary' htmlType='button' onClick={openModal}>Оформить заказ</Button>
      </div>

      {modal}
  </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
}

export default BurgerConstructor
