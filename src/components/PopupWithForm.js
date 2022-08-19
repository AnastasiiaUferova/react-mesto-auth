import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  submitText = "Save",
  children,
  onSubmit,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <div className="popup__container popup__container_type_form">
        <button
          className="popup__close-button popup__close-button_type_edit"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} name={`${name}`} className="popup__form-info">
          {children}
          <button className="popup__save-button" type="submit">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
