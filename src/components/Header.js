import logo from '../images/logo.svg';

export function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место" />
    </header>
  );
}