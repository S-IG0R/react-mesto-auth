import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
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
  );
}
