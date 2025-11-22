import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordReset } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';

const ForgotPassword = () => {
  const {values, handleChange} = useForm({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await sendPasswordReset(values.email);

      if (result.success) {
        navigate('/reset-password', { state: { from: location } })
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
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={values.email === '' || isSubmitting}
        >Восстановить</Button>

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
          <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>

          <Button
            htmlType='button'
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

export default ForgotPassword
