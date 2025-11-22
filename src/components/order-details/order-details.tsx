import styles from './order-details.module.css';
import doneImage from '../../images/done.png';
import { useSelector } from 'react-redux';
import { FC } from 'react';

const OrderDetails: FC = () => {
  const numberClassName = [styles.number, 'text text_type_digits-large'].join(' ');

  // TODO
  const number = useSelector<any, number>((store) => store.createdOrder.number);

  return (
    <div className={styles.container}>
      <p className={numberClassName}>{number}</p>
      <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
      <img className='mt-15' src={doneImage} alt="done" />
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails