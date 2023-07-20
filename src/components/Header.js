import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export function Header({ paths, userInfo, onSignOut }) {
  const { login, registration } = paths;

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
  if (userInfo) {
    pathData.link = login;
    pathData.caption = 'Выйти';
  }

  const handleLogout = () => {
    onSignOut()
  };

  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип Место" />
        <div className="header__userinfo">
          {userInfo?.data?.email && (
            <p className="header__email">{userInfo?.data?.email}</p>
          )}
          <Link
            to={pathData.link}
            className="header__link"
            onClick={userInfo?.data?.email ? handleLogout : ''}
          >
            {pathData.caption}
          </Link>
        </div>
      </div>
    </header>
  );
}
