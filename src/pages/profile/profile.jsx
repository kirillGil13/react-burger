import { useCallback, useMemo, useRef, useState } from 'react';
import styles from './profile.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../services/user';
import { editUser } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';

const Profile = () => {
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const user = useSelector(store => store.user.user);
  const initialUser = useSelector(store => store.user.initialUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const inputRef = useRef(null)

  const onChangeFormValue = e => {
    dispatch(setUser({
      ...user,
      [e.target.name]: e.target.value
    }))
  }

  const onNameEditClick = useCallback(() => {
    setIsNameDisabled(false);
    inputRef.current.focus();
  }, [inputRef])

  const isSubmitButtonDisabled = useMemo(() => {    
    return JSON.stringify(user) === JSON.stringify(initialUser) || isSubmitting;
    },
    [user, isSubmitting]
  );

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await dispatch(editUser(user))
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return user && (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input
        ref={inputRef}
        placeholder={'Имя'}
        onChange={onChangeFormValue}
        value={user.name}
        name={'name'}
        icon='EditIcon'
        disabled={isNameDisabled}
        onIconClick={onNameEditClick}
        onBlur={() => setIsNameDisabled(true)}
      />

      <EmailInput
        onChange={onChangeFormValue}
        value={user.email}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
      />

      <div className={styles.actions}>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => dispatch(setUser(initialUser))}
        >Отмена</Button>

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={isSubmitButtonDisabled}
        >Сохранить</Button>
      </div>

      {error && <ErrorItem error={error} />}
    </form>
  )
}

export default Profile
