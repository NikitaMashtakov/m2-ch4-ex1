import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import styles from './RegisterForm.module.css';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email().required('Введите e-mail'),
    password: yup.string().min(8).required('Введите пароль'),
  })
  .required();

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.registerForm} onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
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
              label="Пароль"
              error={errors.repeatPassword?.message}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          onClick={() => {
            trigger();
          }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
