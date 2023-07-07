export function ImagePopup({ card, onClose }) {
  const handleClickToOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
  return (
    <section
      className={`popup popup_type_view-photo ${card && 'popup_opened'}`}
      onClick={handleClickToOverlay}
    >
      <div className="popup__container popup__container_type_zoom-photo">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__picture-caption">{card?.name}</p>
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
