export function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit
}) {
  const handleClickToOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
  return (
    <section
      className={`popup popup_type_${name} ${isOpen && `popup_opened`}`}
      onClick={handleClickToOverlay}
    >
      <div className="popup__container">
        <p className="popup__title">{title}</p>
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name="popup-form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className="popup__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
