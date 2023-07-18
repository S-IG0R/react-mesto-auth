import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import { Login } from './Login';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Notification } from './Notification';
import { PopupWithConfirmation } from './PopupWithConfirmation';

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
  const [cardToDelete, setCardToDelete] = React.useState(null);
  // Состояние данных карточек
  const [cards, setCards] = React.useState([]);
  // Состояние попапа с картинкой
  const [selectedCard, setSelectedCard] = React.useState(null);

  // Забираем данные карточек и пользователя при загрузке приложения
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  // Обработчик закрытия крестиком для всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
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
  const handleCardLike = React.useCallback(
    (card, myId) => {
      //проверяем есть ли лайк
      const isLiked = card.likes.some((like) => {
        return like._id === myId;
      });

      //если isLiked вернула true - убираем, false - ставим
      isLiked
        ? api
            .deleteLike(card._id)
            .then((newCardData) => {
              setCards((cardsInState) => {
                return cardsInState.map((cardInState) => {
                  return cardInState._id === card._id
                    ? newCardData
                    : cardInState;
                });
              });
            })
            .catch((err) => console.log(err))
        : api
            .putLike(card._id)
            .then((newCardData) => {
              setCards((cardsInState) => {
                return cardsInState.map((cardInState) => {
                  return cardInState._id === card._id
                    ? newCardData
                    : cardInState;
                });
              });
            })
            .catch((err) => console.log(err));
    },
    [setCards]
  );

  //обработка передачи данных на сервер удаления карточки
  const handleCardDelete = React.useCallback(
    (cardToDelete) => {
      setShowLoading('...');
      api
        .deleteCard(cardToDelete._id)
        .then(() => {
          setCards((state) => {
            return state.filter((cardInState) => {
              return cardInState._id !== cardToDelete._id;
            });
          });
          showNotification('Карточка удалена', true, true);
          closeAllPopups();
        })
        .catch((err) =>
          showNotification(`Карточка не удалена, ${err}`, false, true)
        )
        .finally(() => {
          setShowLoading('');
        }); 
    },
    [setCards]
  );

  //обработка клика по корзине
  const handleClickDelete = React.useCallback(
    (card) => {
      setCardToDelete(card);
    },
    [setCardToDelete]
  );

  //обработка передачи на сервер обновлению данных пользователя
  const handleUpdateUser = React.useCallback(
    ({ name, about }) => {
      setShowLoading('...');
      api
        .setProfileData({ name, about })
        .then((newUserData) => {
          setCurrentUser(newUserData);
          showNotification('Данные пользователя обновлены', true, true);
          closeAllPopups();
        })
        .catch((err) =>
          showNotification(`Данные не обновлены, ${err}`, false, true)
        )
        .finally(() => {
          setShowLoading('');
        });
    },
    [setCurrentUser]
  );

  //обработка передачи данных на сервер нового аватара
  const handleUpdateAvatar = React.useCallback(
    (avatar) => {
      setShowLoading('...');
      api
        .setUserAvatar(avatar)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          showNotification('Аватар обновлен', true, true);
          closeAllPopups();
        })
        .catch((err) =>
          showNotification(`Аватар не обновлен, ${err}`, false, true)
        )
        .finally(() => {
          setShowLoading('');
        });
    },
    [setCurrentUser]
  );

  //обработка передачи данных на сервер добавления новый карточки
  const handleAddPlaceSubmit = React.useCallback(
    (inputValues) => {
      setShowLoading('...');
      api
        .addNewCard(inputValues)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          showNotification('Новая карточка добавлена', true, true);
          closeAllPopups();
        })
        .catch((err) =>
          showNotification(`Новая карточка не добавлена, ${err}`, false, true)
        )
        .finally(() => {
          setShowLoading('');
        });
    },
    [cards]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Login/>
        {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onClickDelete={handleClickDelete}
          cards={cards}
        />
        <Footer /> */}
        <PopupWithConfirmation
          onClose={closeAllPopups}
          isOpen={cardToDelete}
          onLoading={showLoading}
          onConfirm={handleCardDelete}
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
