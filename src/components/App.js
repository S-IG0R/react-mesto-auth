import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/Api';

function App() {
  // Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  // Состояние данных пользователя
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  // Состояние данных карточек
  const [cards, setCards] = React.useState([]);

  // Состояние попапа с картинкой
  const [selectedCard, setSelectedCard] = React.useState(null);

  // Забираем данные карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  // Забираем данные пользователя
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.log(err));
  }, []);

  // Обработчик закрытия крестиком для всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // Обработчики открытия попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (link) => {
    setSelectedCard(link);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        userAvatar={userAvatar}
        userName={userName}
        userDescription={userDescription}
        cards={cards}
      />
      <Footer />
      <PopupWithForm
        name="confirm-delete"
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да"
      />
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        <input
          className="popup__input popup__input_el_pic-url"
          name="avatar"
          id="input-avatar-url"
          type="url"
          placeholder="Ссылка на аватарку"
          required
        />
        <span className="input-avatar-url-error popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        <input
          className="popup__input popup__input_el_name"
          name="name"
          id="input-name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="input-name-error popup__input-error"></span>
        <input
          className="popup__input popup__input_el_job"
          name="job"
          id="input-job"
          type="text"
          placeholder="Род деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="input-job-error popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="add-pic"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
      >
        <input
          className="popup__input popup__input_el_pic-name"
          name="name"
          id="input-pic-name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="input-pic-name-error popup__input-error"></span>
        <input
          className="popup__input popup__input_el_pic-url"
          name="link"
          id="input-pic-url"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="input-pic-url-error popup__input-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
