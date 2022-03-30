import React from "react";

function PopupConfirm({ name, card, title, isOpen, submitText = "Да", onClose, onCardDelete, onSubmit }) {
    function onSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <div className="popup__container popup__container_type_form">
                <button className="popup__close-button popup__close-button_type_edit" type="button" onClick={onClose}></button>
                <h2 className="popup__title_type_confirm popup__title">{title}</h2>
                <form onSubmit={onSubmit} name={`${name}`} className="popup__form-info">
                    <button className="popup__save-button" type="submit">
                        {submitText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupConfirm;


