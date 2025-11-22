import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useCallback, useState, useMemo, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { EDragTypes } from '../../utils/dragTypes'
import { addConstructorIngredient, deleteConstructorIngredient, moveConstructorIngredient, replaceConstructorIngredient } from '../../services/constructorIngredients';
import BurgerConstructorMain from './burger-constructor-main/burger-constructor-main';
import { createOrder } from '../../utils/createOrder';
import Loader from '../loader/loader';
import { hasAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { IConstructorIngredient, IIngredient } from '../../types';

const createEmptyItem = (): IConstructorIngredient => {
  return {
    _id: '',
    name: '',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    uuid: '',
    image_large: '',
  }
}

const BurgerConstructor: FC = () => {
  const [opened, setOpened] = useState<boolean>(false)

  // TODO
  const constructorIngredients = useSelector<any, any[]>((store) => store.constructorIngredients.list);
  const isCreatingOrder = useSelector<any, boolean>((store) => store.createdOrder.isLoading);

  // TODO
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  
  const [, dropTarget] = useDrop<IIngredient>({
    accept: EDragTypes.INGREDIENT,
    drop(item) {
      handleDrop(item)
    }
  })

  const handleDrop = (item: IIngredient) => {
    const bun = constructorIngredients.find((item) => item.type === 'bun')

    if (item.type === 'bun' && bun) {
      dispatch(replaceConstructorIngredient({from: bun, to: item}))
    } else {
      dispatch(addConstructorIngredient(item))
    }
  }

  const bun = useMemo<IConstructorIngredient>(() => 
    constructorIngredients.find((item) => item.type === 'bun') ?? createEmptyItem(), 
    [constructorIngredients]
  );

  const ingredients = useMemo<IConstructorIngredient[]>(
    () => constructorIngredients.filter((item) => item.type !== 'bun'),
    [constructorIngredients]
    )

  const total = useMemo<number>(() => 
    bun.price * 2 + ingredients.reduce((acc, item) => acc + item.price, 0),
  [bun, ingredients]
  )

  const onDeleteItem = useCallback((uuid: IConstructorIngredient['uuid']) => {    
    dispatch(deleteConstructorIngredient(uuid))
  }, [dispatch])

  const onMoveItem = useCallback((dragItem: IConstructorIngredient, dropToItem: IConstructorIngredient) => {
    const dragItemIndex = constructorIngredients.findIndex((item) => item.uuid === dragItem.uuid)  
    const dropToItemIndex = constructorIngredients.findIndex((item) => item.uuid === dropToItem.uuid)    

    dispatch(moveConstructorIngredient({fromIndex: dragItemIndex, toIndex: dropToItemIndex}))
  }, [dispatch, constructorIngredients])

  const closeModal = useCallback(() => {
    setOpened(false)
  }, [])

  const onCreateOrder = useCallback(async () => {
    if (!hasAuth()) {
      navigate('/login')
      return
    }
    await dispatch(createOrder(constructorIngredients.map((item) => item._id)))

    setOpened(true)
  }, [constructorIngredients, dispatch, navigate])

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

        <Button 
          disabled={!bun._id || isCreatingOrder} 
          size='large' 
          type='primary' 
          htmlType='button' 
          onClick={onCreateOrder}
        >
          { isCreatingOrder ? <Loader /> : 'Оформить заказ'}
        </Button>
      </div>

      {modal}
  </section>
  )
}

export default BurgerConstructor
