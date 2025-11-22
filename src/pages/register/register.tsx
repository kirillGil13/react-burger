import styles from './register.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';
import { handleError } from '../../utils/handleError';
import { useAppDispatch } from '../../hooks/hooks';

const Register: FC = () => {
  const {values, handleChange} = useForm({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSubmitBtnDisabled = useMemo<boolean>(() => {
    return !values.name || !values.email || !values.password || isSubmitting;
    },
    [values, isSubmitting]
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await dispatch(registerUser(values))
      navigate('/', { replace: true });
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className={styles.content} onSubmit={onSubmit}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>

        <Input
          onChange={handleChange}
          value={values.name}
          name={'name'}
          placeholder="Имя"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
        />

        <PasswordInput
          value={values.password}
          onChange={handleChange}
          name={'password'}
          placeholder="Пароль"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={isSubmitBtnDisabled}
        >Зарегистрироваться</Button>

        {error && <ErrorItem error={error} />}
      </form>

      <div className={styles.links}>
        <div className={styles['link-item']}>
          <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</span>

          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => {
              navigate('/login')
            }}
            extraClass={styles['link-button']}
          >Войти</Button>
        </div>
      </div>
    </>
  )
}

export default Register
