import React from 'react' 

function InfoTooltip({isOpen, onClose, text, image}) { 

    
    return (
        <div className={isOpen ? `popup popup_opened` : `popup`} >
            <div className="popup__container popup__container_type_info">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img
                className="popup__info-image"
                src={image}
                alt="Confirmation sign"
                />
                <h2 className="popup__title popup__title_type_info">{text}</h2>
    
            </div>
        </div>
    );
}

export default InfoTooltip
