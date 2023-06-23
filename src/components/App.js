import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';


function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    
      <section className="popup popup_type_confirm-delete" aria-label="Модальное окно удаления картинки">
        <div className="popup__container">
          <p className="popup__title">Вы уверены?</p>
          <button className="popup__close-btn" type="button"></button>
          <form className="popup__form popup__form_type_confirm-delete" name="confirm-delete" noValidate>
            <button className="popup__submit-btn popup__submit-btn_type_confirm-delete" type="submit">Да</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_edit-avatar" aria-label="Модальное окно редактирования аватара">
        <div className="popup__container">
          <p className="popup__title">Обновить аватар</p>
          <button className="popup__close-btn" type="button"></button>
          <form className="popup__form popup__form_type_edit-avatar" name="popup-avatar" noValidate>
            <input className="popup__input popup__input_el_pic-url" name="avatar" id="input-avatar-url" type="url" placeholder="Ссылка на аватарку" required />
            <span className="input-avatar-url-error popup__input-error"></span>
            <button className="popup__submit-btn popup__submit-btn_type_avatar-change" type="submit">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_edit-profile" aria-label="Модальное окно редактирования профиля">
        <div className="popup__container">
          <p className="popup__title">Редактировать профиль</p>
          <button className="popup__close-btn" type="button"></button>
          <form className="popup__form popup__form_type_edit-profile" name="popup-form" noValidate>
              <input className="popup__input popup__input_el_name" name="name" id="input-name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
              <span className="input-name-error popup__input-error"></span>
              <input className="popup__input popup__input_el_job" name="job" id="input-job" type="text" placeholder="Род деятельности" minLength="2" maxLength="200" required />
              <span className="input-job-error popup__input-error"></span>
            <button className="popup__submit-btn popup__submit-btn_type_edit-bio" type="submit">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_add-photo" aria-label="Модальное окно загрузки фото">
        <div className="popup__container">
          <p className="popup__title">Новое место</p>
          <button className="popup__close-btn" type="button"></button>
          <form className="popup__form popup__form_type_add-pic" name="popup-add-pic" noValidate>
              <input className="popup__input popup__input_el_pic-name" name="name" id="input-pic-name" type="text" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="input-pic-name-error popup__input-error"></span>
              <input className="popup__input popup__input_el_pic-url" name="link" id="input-pic-url" type="url" placeholder="Ссылка на картинку" required />
              <span className="input-pic-url-error popup__input-error"></span>
            <button className="popup__submit-btn popup__submit-btn_type_new-photo" type="submit">Создать</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_view-photo" aria-label="Модальное окно просмотра фото">
        <div className="popup__container popup__container_type_zoom-photo">
          <img className="popup__image" src="#" alt="#" />
          <p className="popup__picture-caption"></p>
          <button className="popup__close-btn" type="button"></button>
        </div>
      </section>
      <template id="card-template">
        <div className="cards__item">
          <img className="cards__image" src="#" alt="#" role="button" />
          <div className="cards__container">
            <h2 className="cards__title"></h2>
            <div className="card__like-container">
              <button className="cards__like-button" type="button"></button>
              <span className="card__like-counter">0</span>
            </div>
            <button className="cards__trash-button" type="button"></button>
          </div>
        </div>
      </template>
  </div>
  );
}

export default App;
