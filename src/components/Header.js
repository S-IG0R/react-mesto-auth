import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export function Header({ paths }) {
  const { login, registration, main } = paths;

  const { pathname } = useLocation();

  const pathData = {
    link: registration,
    caption: 'Регистрация',
  };

  if (pathname === login) {
    pathData.link = registration;
    pathData.caption = 'Регистрация';
  }
  if (pathname === registration) {
    pathData.link = login;
    pathData.caption = 'Войти';
  }
  if (pathname === main) {
    pathData.link = login;
    pathData.caption = 'Выйти';
  }

  const handleClick = () => {console.log('dffdd')};

  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип Место" />
        <Link
          to={pathData.link}
          className="header__link"
          onClick={pathname === main ? handleClick : ''}
        >
          {pathData.caption}
        </Link>
      </div>
    </header>
  );
}
