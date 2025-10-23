import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useCallback, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DragTypes } from '../../utils/dragTypes'
import { addConstructorIngredient, deleteConstructorIngredient, moveConstructorIngredient, replaceConstructorIngredient } from '../../services/constructorIngredients';
import BurgerConstructorMain from './burger-constructor-main/burger-constructor-main';
import { createOrder } from '../../utils/createOrder';

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
    image: '',
    uuid: '',
  }
}

const BurgerConstructor = () => {
  const [opened, setOpened] = useState(false)

  const constructorIngredients = useSelector((store) => store.constructorIngredients.list);

  const dispatch = useDispatch()
  
  const [, dropTarget] = useDrop({
    accept: DragTypes.INGREDIENT,
    drop(item) {
      handleDrop(item)
    }
  })

  const handleDrop = (item) => {
    const bun = constructorIngredients.find((item) => item.type === 'bun')

    if (item.type === 'bun' && bun) {
      dispatch(replaceConstructorIngredient({from: bun, to: item}))
    } else {
      dispatch(addConstructorIngredient(item))
    }
  }

  const bun = useMemo(() => 
    constructorIngredients.find((item) => item.type === 'bun') ?? createEmptyItem(), 
    [constructorIngredients]
  );

  const ingredients = useMemo(
    () => constructorIngredients.filter((item) => item.type !== 'bun'),
    [constructorIngredients]
    )

  const total = useMemo(() => 
    bun.price * 2 + ingredients.reduce((acc, item) => acc + item.price, 0),
  [bun, ingredients]
  )

  const onDeleteItem = useCallback((uuid) => {    
    dispatch(deleteConstructorIngredient(uuid))
  }, [dispatch])

  const onMoveItem = useCallback((dragItem, dropToItem) => {
    const dragItemIndex = constructorIngredients.findIndex((item) => item.uuid === dragItem.uuid)  
    const dropToItemIndex = constructorIngredients.findIndex((item) => item.uuid === dropToItem.uuid)    

    dispatch(moveConstructorIngredient({fromIndex: dragItemIndex, toIndex: dropToItemIndex}))
  }, [dispatch, constructorIngredients])

  const closeModal = useCallback(() => {
    setOpened(false)
  }, [])

  const onCreateOrder = useCallback(async () => {
    await dispatch(createOrder(constructorIngredients.map((item) => item._id)))

    setOpened(true)
  }, [constructorIngredients, dispatch])

  const modal = (
    <Modal opened={opened} onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

  return (
    <section className={styles.container}>
      <div ref={dropTarget} className={styles.content}>
        {
          bun._id &&
          <ConstructorElement
            type="top"
            isLocked
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.locked}
          />
        }

        <BurgerConstructorMain ingredients={ingredients} onDeleteItem={onDeleteItem} onMoveItem={onMoveItem} />

        {
          bun._id &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.locked}
          />
        }
      </div>

      <div className={styles.bottom}>
        <div className={styles.total}>
          <span className='text text_type_digits-medium'>{total}</span>

          <CurrencyIcon className={styles.icon} type="primary" />
        </div>

        <Button size='large' type='primary' htmlType='button' onClick={onCreateOrder}>Оформить заказ</Button>
      </div>

      {modal}
  </section>
  )
}

export default BurgerConstructor
