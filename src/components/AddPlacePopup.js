import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        });
    }

    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm name="new-card" title="New Place" submitText="Add card" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input value={name} onChange={handleChangeName} id="placename-input" type="text" name="name" className="popup__input popup__input_type_placename" placeholder="Place name" minLength="{2}" maxLength="{30}" required />
            <span className="popup__error placename-input-error">Error</span>
            <input value={link} onChange={handleChangeLink} id="link-input" type="url" name="link" className="popup__input popup__input_type_url" placeholder="Place image URL" required />
            <span className="popup__error link-input-error">Error</span>
        </PopupWithForm>
    );
}