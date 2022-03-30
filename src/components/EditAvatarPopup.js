import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleChangeAvatar() {
        avatarRef.current.focus();
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input onChange={handleChangeAvatar} ref={avatarRef} id="avatar-input" type="url" name="avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" required />
            <span className="popup__error avatar-input-error">Error</span>
        </PopupWithForm>
    );
}