export function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_view-photo ${card && 'popup_opened'}`}
      aria-label="Модальное окно просмотра фото"
    >
      <div className="popup__container popup__container_type_zoom-photo">
        <img className="popup__image" src={card} alt="#" />
        <p className="popup__picture-caption"></p>
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
