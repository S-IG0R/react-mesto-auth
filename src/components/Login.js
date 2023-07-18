export const Login = () => {
  return (
    <section className="login">
      <div className="login__container">
        <p className="login__title">Вход</p>
        <form className="login__form" name="login-form">
          <input
            className="login__input"
            type="text"
            required
            placeholder="Email"
          ></input>
          <input
            className="login__input"
            type="password"
            required
            placeholder="Пароль"
          ></input>
          <button className="login__submit-btn">Войти</button>
        </form>
      </div>
    </section>
  );
};
