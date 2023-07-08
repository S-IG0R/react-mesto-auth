import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import { EditProfilePopup } from './EditProfilePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  // Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  // Состояние данных карточек
  const [cards, setCards] = React.useState([]);

  // Состояние попапа с картинкой
  const [selectedCard, setSelectedCard] = React.useState(null);

  //забираем массив данных пользователя при загрузке приложения
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  // Забираем данные карточек при загрузке приложения
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  // Проверка открыт ли хоть один попап
  const isAnyPopupOpen = React.useMemo(() => {
    return (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard
    );
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
  ]);

  // Закрытие попапа по Esc - если true вешаем попап
  React.useEffect(() => {
    if (isAnyPopupOpen) {
      const handleEsc = (evt) => {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isAnyPopupOpen]);

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

  //обработка лайка
  const handleCardLike = (card, myId) => {
    //проверяем есть ли лайк
    const isLiked = card.likes.some((like) => {
      return like._id === myId;
    });

    isLiked
      ? api
          .deleteLike(card._id)
          .then((newCardData) => {
            setCards((stateCards) => {
              return stateCards.map((cardInState) => {
                return cardInState._id === card._id ? newCardData : cardInState;
              });
            });
          })
          .catch((err) => console.log(err))
      : api
          .putLike(card._id)
          .then((newCardData) => {
            setCards((stateCards) => {
              return stateCards.map((cardInState) => {
                return cardInState._id === card._id ? newCardData : cardInState;
              });
            });
          })
          .catch((err) => console.log(err));
  };

  //обработка удаления карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((cardInState) => {
            return cardInState._id !== card._id;
          });
        });
      })
      .catch((err) => console.log(err));
  };

  //обработка обновления данных юзера после сабмита
  const handleUpdateUser = ({name, about}) => {
    api
    .setProfileData({ name, about })
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <CardsContext.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </CardsContext.Provider>
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
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
