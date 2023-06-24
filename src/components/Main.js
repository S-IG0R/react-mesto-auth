export function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__common-container">
          <button className="profile__avatar-edit-btn" onClick={onEditAvatar}>
            <img src="#" alt="аватарка" className="profile__avatar" />
          </button>
          <div className="profile__text-container">
            <h1 className="profile__hero-name"></h1>
            <p className="profile__hero-job"></p>
          </div>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Фотогалерея"></section>
    </main>
  );
}
