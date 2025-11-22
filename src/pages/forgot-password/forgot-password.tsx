import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { FC, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordReset } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';
import { handleError } from '../../utils/handleError';

const ForgotPassword: FC = () => {
  const {values, handleChange} = useForm({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await sendPasswordReset(values.email);

      if (result) {
        navigate('/reset-password', { state: { from: location } })
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
