import { Card } from './Card';

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  userAvatar,
  userName,
  userDescription,
  cards,
}) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__common-container">
          <button className="profile__avatar-edit-btn" onClick={onEditAvatar}>
            <img src={userAvatar} alt="аватарка" className="profile__avatar" />
          </button>
          <div className="profile__text-container">
            <h1 className="profile__hero-name">{userName}</h1>
            <p className="profile__hero-job">{userDescription}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="Фотогалерея">
        {cards.map((card) => {
          return <Card card={card} key={card._id} onCardClick={onCardClick} />;
        })}
      </section>
    </main>
  );
}
