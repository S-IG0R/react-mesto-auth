import { useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AddPlacePopup({ isOpen, onClose, onAddCard, onLoading }) {
  const [inputsValues, setInputsValues] = useState({ name: '', link: '' });

  const handleChange = (evt) => {
    setInputsValues((previousValues) => ({
      ...previousValues,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddCard(inputsValues);
  };

  useEffect(() => {
    setInputsValues({ name: '', link: '' });
  }, [onClose]);

  return (
    <PopupWithForm
      name="add-pic"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`Создать${onLoading}`}
    >
      <input
        className="popup__input popup__input_el_pic-name"
        name="name"
        id="input-pic-name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={inputsValues.name}
        onChange={handleChange}
        required
      />
      <span className="input-pic-name-error popup__input-error"></span>
      <input
        className="popup__input popup__input_el_pic-url"
        name="link"
        id="input-pic-url"
        type="url"
        placeholder="Ссылка на картинку"
        value={inputsValues.link}
        onChange={handleChange}
        required
      />
      <span className="input-pic-url-error popup__input-error"></span>
    </PopupWithForm>
  );
}
