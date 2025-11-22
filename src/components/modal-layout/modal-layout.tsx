import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { deleteCurrentIngredient } from '../../services/currentIngredient';
import { IIngredient } from '../../utils/types';

const ModalLayout = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  // TODO
  const dispatch = useDispatch<any>()

  // TODO
  const data = useSelector<any, any[]>((store) => store.ingredientList.list);

  const currentIngredient = useMemo<IIngredient>(() => data.find(item => item._id === id), [data, id]);

  const closeModal = () => {
    dispatch(deleteCurrentIngredient())
    navigate('/');
  };

  return (
    <Modal title='Детали ингредиента' opened={true} onClose={closeModal}>
      <IngredientDetails item={currentIngredient} />
    </Modal>
  )
}

export default ModalLayout
