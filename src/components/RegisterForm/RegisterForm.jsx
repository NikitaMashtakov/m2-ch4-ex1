import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import styles from './RegisterForm.module.css';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Адрес должен соответствовать виду example@example.com')
      .matches(
        /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Адрес должен соответствовать виду example@example.com',
      )
      .required('Введите e-mail'),
    password: yup
      .string()
      .min(6, 'Минимальная длина пароля 6 символов')
      .required('Введите пароль'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
      .required('Повторите пароль'),
  })
  .required();

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const submitButtonRef = useRef(null);

  const submitForm = (data) => {
    const { email, password } = data;
    console.log({ email, password });
  };

  useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);

  return (
    <div className={styles.container}>
      <form className={styles.registerForm} onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="example@example.com"
              label="E-mail"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Введите пароль"
              label="Пароль"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Повторите пароль"
              label="Повторите пароль"
              error={errors.repeatPassword?.message}
              {...field}
            />
          )}
        />

        <Button ref={submitButtonRef} type="submit" disabled={!isValid}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
