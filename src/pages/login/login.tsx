import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { FC, FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';
import { handleError } from '../../utils/handleError';

const Login: FC = () => {
  const {values, handleChange} = useForm({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // TODO
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const isSubmitButtonDisabled = useMemo<boolean>(() => {
    return !values.password || !values.email || isSubmitting;
    },
    [values, isSubmitting]
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await dispatch(signIn(values));

      if (result) {
        navigate(from, {replace: true})
      }
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className={styles.content} onSubmit={onSubmit}>
        <h2 className='text text_type_main-medium'>Вход</h2>

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
          disabled={isSubmitButtonDisabled}
        >Войти</Button>

        {error && <ErrorItem error={error} />}
      </form>

      <div className={styles.links}>
        <div className={styles['link-item']}>
          <span className='text text_type_main-default text_color_inactive'>Вы - новый пользователь?</span>

          <Button
            htmlType='button'
            type="secondary"
            size="medium"
            onClick={() => {
              navigate('/register')
            }}
            extraClass={styles['link-button']}
          >Зарегистрироваться</Button>
        </div>

        <div className={styles['link-item']}>
          <span className='text text_type_main-default text_color_inactive'>Забыли пароль?</span>

          <Button
            htmlType='button'
            type="secondary"
            size="medium"
            onClick={() => {
              navigate('/forgot-password')
            }}
            extraClass={styles['link-button']}
          >Восстановить пароль</Button>
        </div>
      </div>
    </>
  )
}

export default Login
