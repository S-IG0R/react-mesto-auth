import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Notification } from './Notification';

function App() {
  // Состояние всплывающего уведомления
  const [notification, setNotification] = React.useState(null);
  // Состояние процесса загрузки на сервер
  const [showLoading, setShowLoading] = React.useState('');
  // Состояние пользовательских данных
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

  // Закрытие попапа по Esc
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

  const showNotification = (message, isSuccess, isActive) => {
    setNotification({ message, isSuccess, isActive });
    setTimeout(
      () => setNotification({ message, isSuccess, isActive: false }),
      2000
    );
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

  //обработка передачи данных на сервер удаления карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((cardInState) => {
            return cardInState._id !== card._id;
          });
        });
        showNotification('Карточка удалена', true, true);
      })
      .catch((err) =>
        showNotification(`Карточка не удалена, ${err}`, false, true)
      );
  };

  //обработка передачи на сервер обновлению данных пользователя
  const handleUpdateUser = ({ name, about }) => {
    setShowLoading('...');
    api
      .setProfileData({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        showNotification('Данные пользователя обновлены', true, true);
      })
      .catch((err) =>
        showNotification(`Данные не обновлены, ${err}`, false, true)
      )
      .finally(() => {
        setShowLoading('');
        closeAllPopups();
      });
  };

  //обработка передачи данных на сервер нового аватара
  const handleUpdateAvatar = (avatar) => {
    setShowLoading('...');
    api
      .setUserAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        showNotification('Аватар обновлен', true, true);
      })
      .catch((err) =>
        showNotification(`Аватар не обновлен, ${err}`, false, true)
      )
      .finally(() => {
        setShowLoading('');
        closeAllPopups();
      });
  };

  //обработка передачи данных на сервер добавления новый карточки
  const handleAddPlaceSubmit = (inputValues) => {
    setShowLoading('...');
    api
      .addNewCard(inputValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        showNotification('Новая карточка добавлена', true, true);
      })
      .catch((err) =>
        showNotification(`Новая карточка не добавлена, ${err}`, false, true)
      )
      .finally(() => {
        setShowLoading('');
        closeAllPopups();
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <PopupWithForm
          name="confirm-delete"
          title="Вы уверены?"
          onClose={closeAllPopups}
          buttonText="Да"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={showLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={showLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          onLoading={showLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Notification onAction={notification} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
