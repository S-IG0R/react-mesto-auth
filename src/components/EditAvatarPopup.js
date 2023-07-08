import { useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_el_pic-url"
        name="avatar"
        id="input-avatar-url"
        type="url"
        placeholder="Ссылка на аватарку"
        ref={inputRef}
        required
      />
      <span className="input-avatar-url-error popup__input-error"></span>
    </PopupWithForm>
  );
}
