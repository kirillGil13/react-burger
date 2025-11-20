import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';

const ResetPassword = () => {
  const {values, handleChange} = useForm({
    password: '',
    token: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const isSubmitButtonDisabled = useMemo(() => {
    return !values.password || !values.token || isSubmitting;
    },
    [values, isSubmitting]
  );

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await resetPassword(values.password, values.token);

      if (result.success) {
        navigate('/login')
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (from !== '/forgot-password') {
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <>
      <form className={styles.content} onSubmit={onSubmit}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          placeholder="Введите новый пароль"
        />

        <Input
          onChange={handleChange}
          value={values.token}
          name={'token'}
          placeholder="Введите код из письма"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={isSubmitButtonDisabled}
        >Сохранить</Button>

        {error && <ErrorItem error={error} />}
      </form>

      <div className={styles.links}>
        <div className={styles['link-item']}>
          <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>

          <Button
            htmlType='button'
            type="secondary"
            size="medium"
            onClick={() => {
              navigate('/login', {replace: true})
            }}
            extraClass={styles['link-button']}
          >Войти</Button>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
