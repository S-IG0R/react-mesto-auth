import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { registration } from '../utils/Auth';

export const Register = ({ redirectPath }) => {
  const { login } = redirectPath;
  const { values, handleChange } = useForm({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registration(values.email, values.password)
      .then((res) => {    
        console.log(res);
          navigate(login, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="register">
      <div className="register__container">
        <p className="register__title">Регистрация</p>
        <form
          className="register__form"
          name="sign-up-form"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            className="register__input"
            type="email"
            required
            placeholder="Email"
            minLength="2"
            maxLength="30"
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className="register__input"
            type="password"
            required
            placeholder="Пароль"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
          <button className="register__submit-btn" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__subtitle">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};
