export function Card ({card}) {
    return (
        <div className="cards__item">
        <img className="cards__image" src={card.link} alt={card.name} role="button" />
        <div className="cards__container">
          <h2 className="cards__title">{card.name}</h2>
          <div className="card__like-container">
            <button className="cards__like-button" type="button"></button>
            <span className="card__like-counter">{card.likes.length}</span>
          </div>
          <button className="cards__trash-button" type="button"></button>
        </div>
      </div>
    )
}