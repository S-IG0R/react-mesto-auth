export function Main() {

const handleEditAvatarClick = () => {
    document.querySelector('.popup_type_edit-avatar').classList.add('popup_opened')
}
const handleEditProfileClick = () => {
    document.querySelector('.popup_type_edit-profile').classList.add('popup_opened')
}
const handleAddPlaceClick = () => {
    document.querySelector('.popup_type_add-photo').classList.add('popup_opened')
}

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__common-container">
          <button className="profile__avatar-edit-btn" onClick={handleEditAvatarClick}>
            <img src="#" alt="аватарка" className="profile__avatar" />
          </button>
          <div className="profile__text-container">
            <h1 className="profile__hero-name"></h1>
            <p className="profile__hero-job"></p>
          </div>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="cards" aria-label="Фотогалерея"></section>
    </main>
  );
}
