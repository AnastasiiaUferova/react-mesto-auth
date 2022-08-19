import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit" title="Edit profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="username-input" type="text" name="name" value={name || ""} onChange={handleChangeName} className="popup__input popup__input_type_name" minLength="{2}" maxLength="{40}" required />
            <span className="popup__error username-input-error">Error</span>
            <input id="description-input" type="text" name="about" value={description || ""} onChange={handleChangeDescription} className="popup__input popup__input_type_job" minLength="{2}" maxLength="{200}" required />
            <span className="popup__error description-input-error">Error</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;





