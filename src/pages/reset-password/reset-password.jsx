import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/auth';
import ErrorItem from '../../components/common/error-item/error-item';

const ResetPassword = () => {
  const [form, setFormValues] = useState({
    password: '',
    token: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const onChangeValue = e => {
    setFormValues({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const isSubmitButtonDisabled = useMemo(() => {
    return !form.password || !form.token || isSubmitting;
    },
    [form, isSubmitting]
  );

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await resetPassword(form.password, form.token);

      if (result.success) {
        navigate('/auth/login')
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (from !== '/auth/forgot-password') {
    return <Navigate to="/auth/forgot-password" replace />
  }

  return (
    <>
      <form className={styles.content} onSubmit={onSubmit}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

        <PasswordInput
          onChange={onChangeValue}
          value={form.password}
          name={'password'}
          placeholder="Введите новый пароль"
          isIcon={false}
        />

        <Input
          onChange={onChangeValue}
          value={form.token}
          name={'token'}
          placeholder="Введите код из письма"
          isIcon={false}
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
              navigate('/auth/login', {replace: true})
            }}
            extraClass={styles['link-button']}
          >Войти</Button>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
