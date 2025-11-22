import { FC, FormEvent, useEffect, useCallback, useMemo, useRef, useState } from 'react';
import styles from './profile.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';
import { handleError } from '../../utils/handleError';

const Profile: FC = () => {
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const user = useSelector<any, any>(store => store.user.user);

  const {values, handleChange, setValues} = useForm({
    name: '',
    email: '',
    password: '',
  })
  const [initialValues, setInitialValues] = useState(values);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // TODO
  const dispatch = useDispatch<any>();

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setValues({...user, password: ''});
      setInitialValues({...user, password: ''})
    }
  }, [user, setValues, setInitialValues])

  const onNameEditClick = useCallback(() => {
    setIsNameDisabled(false);
    inputRef.current?.focus();
  }, [inputRef])

  const isSubmitButtonDisabled = useMemo(() => {      
    return JSON.stringify(initialValues) === JSON.stringify(values) || isSubmitting;
    },
    [values, isSubmitting, initialValues]
  );

  const resetData = () => {
    setValues(initialValues);
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await dispatch(editUser(values))
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input
        ref={inputRef}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.name}
        name={'name'}
        icon='EditIcon'
        disabled={isNameDisabled}
        onIconClick={onNameEditClick}
        onBlur={() => setIsNameDisabled(true)}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />

      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
      />

      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        icon="EditIcon"
      />

      <div className={styles.actions}>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={resetData}
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
