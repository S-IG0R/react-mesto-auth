function ImagePopup() {
    return (
        <section className="popup popup_type_view-photo" aria-label="Модальное окно просмотра фото">
            <div className="popup__container popup__container_type_zoom-photo">
            <img className="popup__image" src="#" alt="#" />
            <p className="popup__picture-caption"></p>
            <button className="popup__close-btn" type="button"></button>
            </div>
      </section>
    )
}