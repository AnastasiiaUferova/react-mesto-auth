import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile root__profile">
                <div className="profile__info-container">
                    <div className="profile__avatar-container">
                        <img src={currentUser.avatar} alt="Avatar" className="profile__avatar" />
                        <button className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <ul className="photo-grid root__photo-grid">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} openPopupDelete={props.openPopupDelete} />
                ))}
            </ul>
        </main>

            
    );
}

export default Main;