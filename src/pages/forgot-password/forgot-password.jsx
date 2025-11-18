import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordReset } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await sendPasswordReset(email);

      if (result.success) {
        navigate('/auth/reset-password', { state: { from: location } })
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
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={email === '' || isSubmitting}
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
              navigate('/auth/register')
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
              navigate('/auth/login')
            }}
            extraClass={styles['link-button']}
          >Войти</Button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
