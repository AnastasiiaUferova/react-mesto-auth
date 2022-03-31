import React from 'react' 
import tick from '../images/Tick.svg'
import cross from '../images/Cross.svg'


function InfoTooltip({isOpen, onClose, text, image}) { 

    
    return (
        <div className={isOpen ? `popup popup_opened` : `popup`} >
            <div className="popup__container popup__container_type_info">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img
                className="popup__info-image"
                src={image}
                alt="Знак подтверждения"
                />
                <h2 className="popup__title popup__title_type_info">{text}</h2>
    
            </div>
        </div>
    );
}

export default InfoTooltip
