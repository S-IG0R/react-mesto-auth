import { useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AddPlacePopup({ isOpen, onClose, onAddCard, onLoading }) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  const handleChangeCardName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeCardLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddCard({ name, link });
  };

  useEffect(() => {
    setName('');
    setLink('');
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
        value={name}
        onChange={handleChangeCardName}
        required
      />
      <span className="input-pic-name-error popup__input-error"></span>
      <input
        className="popup__input popup__input_el_pic-url"
        name="link"
        id="input-pic-url"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeCardLink}
        required
      />
      <span className="input-pic-url-error popup__input-error"></span>
    </PopupWithForm>
  );
}
