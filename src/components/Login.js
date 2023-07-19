import { useForm } from '../hooks/useForm';
import { login } from '../utils/Auth';

export const Login = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    login(values.email, values.password)
      .then((data) => {
        if(data.token){
          localStorage.setItem('jwt', data.token);
          console.log(data.token);
        }
    });
  };
  return (
    <section className="login">
      <div className="login__container">
        <p className="login__title">Вход</p>
        <form
          className="login__form"
          name="sign-in-form"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            className="login__input"
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
            className="login__input"
            type="password"
            required
            placeholder="Пароль"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
          <button className="login__submit-btn" type="submit">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
};
