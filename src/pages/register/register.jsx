import styles from './register.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import ErrorItem from '../../components/common/error-item/error-item';
import { useForm } from '../../hooks/useForm';

const Register = () => {
  const {values, handleChange} = useForm({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isSubmitBtnDisabled = useMemo(() => {
    return !values.name || !values.email || !values.password || isSubmitting;
    },
    [values, isSubmitting]
  );

  const onSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await dispatch(registerUser(values))
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
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
