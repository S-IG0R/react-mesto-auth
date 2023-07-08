import { useContext, useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписка на контекст данных о пользователе
  const currentUser = useContext(CurrentUserContext);

  //состояния инпутов
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //обработка инпута с именем 
  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  //обработка инпута с видом деятельности  
  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  //обработка сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //передаем данные из инпутов в переданную функцию
    onUpdateUser({ name, about: description });
  };

  //установка данных пользователя в инпуты
  useEffect(() => {
    setName(currentUser?.name ?? ''); // оператор нулевого слияния
    setDescription(currentUser?.about ?? ''); // оператор нулевого слияния
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        value={name}
        onChange={handleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <span className="input-job-error popup__input-error"></span>
    </PopupWithForm>
  );
}
