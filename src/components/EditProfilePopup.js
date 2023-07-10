import { useContext, useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  //подписка на контекст данных о пользователе
  const currentUser = useContext(CurrentUserContext);

  //состояния инпутов
  const [inputsValues, setInputsValues] = useState({ name: '', about: '' });

  //обработка инаутов
  const handleChange = (evt) => {
    setInputsValues((previousValues) => ({
      ...previousValues,
      [evt.target.name]: evt.target.value,
    }));
  };

  //обработка сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //передаем данные из инпутов в обработчик api запроса
    onUpdateUser(inputsValues);
  };

  //установка данных пользователя в инпуты
  useEffect(() => {
    setInputsValues({
      name: currentUser?.name ?? '',
      about: currentUser?.about ?? '',
    });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`Сохранить${onLoading}`}
    >
      <input
        className="popup__input popup__input_el_name"
        name="name"
        id="input-name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={inputsValues.name}
        onChange={handleChange}
        required
      />
      <span className="input-name-error popup__input-error"></span>
      <input
        className="popup__input popup__input_el_job"
        name="about" // job
        id="input-job"
        type="text"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        value={inputsValues.about}
        onChange={handleChange}
        required
      />
      <span className="input-job-error popup__input-error"></span>
    </PopupWithForm>
  );
}
