import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import ErrorItem from '../../components/common/error-item/error-item';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const isSubmitButtonDisabled = useMemo(() => {
    return !form.password || !form.email || isSubmitting;
    },
    [form, isSubmitting]
  );

  const onChangeFormValues = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await dispatch(signIn(form));

      if (result.success) {
        navigate(from, {replace: true})
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className={styles.content} onSubmit={onSubmit}>
        <h2 className='text text_type_main-medium'>Вход</h2>

        <EmailInput
          onChange={onChangeFormValues}
          value={form.email}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
        />

        <PasswordInput
          value={form.password}
          onChange={onChangeFormValues}
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
              navigate('/auth/register')
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
              navigate('/auth/forgot-password')
            }}
            extraClass={styles['link-button']}
          >Восстановить пароль</Button>
        </div>
      </div>
    </>
  )
}

export default Login
