import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike, onCardDeletePopup }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className="content">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                <div className="profile__item">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__button-edit" onClick={onEditProfile} type="button" aria-label="Редактировать"></button>
                </div>
                <p className="profile__activity">{currentUser.about}</p>
                <button className="profile__button-add" onClick={onAddPlace} type="button" aria-label="Добавить"></button>
            </section>

            <section className="cards">
                {cards.map((item) => {
                    return (
                        <Card
                            card={item}
                            key={item._id}
                            name={item.name}
                            link={item.link} // Roland, не совсем поняла, что тут надо переделать. удаляю строчки (43-46) - удаляются данные с экрана. оставлю так. уточню в слаке - доделаю. подсказку ж просить нельзя у ревьюера )
                            _id={item._id}
                            likes={item.likes}
                            onCardClicks={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            onCardDeletePopup={onCardDeletePopup}                 
                        />
                    )                    
                })}
            </section>
        </div>
    );
}

export default Main;