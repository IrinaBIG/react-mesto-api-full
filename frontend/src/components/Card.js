import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name, link, likes, onCardClicks, card, onCardLike, onCardDeletePopup }) {

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    // console.dir(currentUser._id);
    const isOwn = card.owner._id === currentUser._id;
    

   // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `${isOwn ? 'button button__remove' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `cards__button ${isLiked && "cards__button_active"}`;

    function handleLikeClick () {
        onCardLike(card);
    }

    function handleDeleteClick (){
        onCardDeletePopup(card);
    }

    function handleClick() {
        onCardClicks(card);  
    }

    return (
        <div className="cards__item" >
            <img className="cards__image"
                src={link}
                alt={name}
                onClick={handleClick}
            />
            {isOwn && <button 
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
                type="button">
            </button>} 
            {/* // isOwn && - реализация отражения кнопки удаления на своих карточках */}
            <div className="cards__date">
                <h2 className="cards__place">{name}</h2>
                <div className="cards__like">
                    <button className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Нравится"
                        onClick={handleLikeClick}
                        >
                    </button>
                    <h4 className="cards__counter">{likes.length}</h4>
                </div>
            </div>
        </div>
    )
}

export default Card;