import { useState, useRef, useEffect } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    emailError: null,
    passwordError: null,
    repeatPasswordError: null,
  });
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    const canSubmit =
      Object.values(formErrors).some((value) => value !== null) ||
      Object.values(formData).some((value) => value === '');
    if (canSubmit) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
  }, [formData, formErrors]);

  const onEmailChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, email: target.value }));
  };

  const onEmailBlur = ({ target }) => {
    let newError = null;

    if (target.value.length < 1) {
      newError = 'Адрес не должен быть пустым.';
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(target.value)) {
      newError =
        'Неверный адрес почты. Адрес должен соответствовать виду example@example.com';
    }
    setFormErrors((prev) => ({ ...prev, emailError: newError }));
  };

  const onPasswordChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, password: target.value }));
  };

  const onPasswordBlur = ({ target }) => {
    let newError = null;

    if (target.value.length < 1) {
      newError = 'Введите пароль';
    }
    setFormErrors((prev) => ({ ...prev, passwordError: newError }));
  };

  const onRepeatPasswordChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, repeatPassword: target.value }));
    if (formData.password === target.value) {
      setFormErrors((prev) => ({ ...prev, repeatPasswordError: null }));
      if (formErrors.emailError === null) {
        submitButtonRef.current.focus();
      }
    }
  };

  const onRepeatPasswordBlur = ({ target }) => {
    if (formData.password !== target.value) {
      setFormErrors((prev) => ({ ...prev, repeatPasswordError: 'Пароли не совпадают' }));
    } else {
      setFormErrors((prev) => ({ ...prev, repeatPasswordError: null }));
    }
  };

  const submitForm = () => {
    const { email, password } = formData;
    console.log(email, password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.registerForm} action={submitForm}>
        <Input
          type="email"
          name="email"
          placeholder="example@example.com"
          label="E-mail"
          value={formData.email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          error={formErrors.emailError}
        />
        <Input
          type="password"
          name="password"
          placeholder="Введите пароль"
          label="Пароль"
          value={formData.password}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          error={formErrors.passwordError}
        />
        <Input
          type="password"
          name="repeatPassword"
          placeholder="Повторите пароль"
          label="Пароль"
          value={formData.repeatPassword}
          onChange={onRepeatPasswordChange}
          onBlur={onRepeatPasswordBlur}
          error={formErrors.repeatPasswordError}
        />
        <Button ref={submitButtonRef} type="submit" disabled={submitBtnDisabled}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
