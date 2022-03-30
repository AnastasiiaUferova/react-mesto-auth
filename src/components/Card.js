import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, openPopupDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = `photo-grid__delete-button ${isOwn ? "photo-grid__delete-button-enable" : "photo-grid__delete-button-remove"}`;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `${isLiked ? " photo-grid__like photo-grid__like_active" : "photo-grid__like"}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        openPopupDelete(card);
    }

    return (
        <li className="photo-grid__item">
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete} />
            <img src={card.link} alt={card.name} className="photo-grid__pic" onClick={handleClick} />
            <div className="photo-grid__title-container">
                <h2 className="photo-grid__title">{card.name}</h2>
                <div className="photo-grid__like-container">
                    <p className="photo-grid__like-number">{card.likes.length}</p>
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
                </div>
            </div>
        </li>
    );
}

export default Card;

