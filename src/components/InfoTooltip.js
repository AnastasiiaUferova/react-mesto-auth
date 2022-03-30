import React from 'react' 
import tick from '../images/Tick.svg'
import cross from '../images/Cross.svg'

function InfoTooltip() { 

    
    return (
        <div className= "popup" >
            <div className="popup__container popup__container_type_info">
                <button className="popup__close-button" type="button"></button>
                <img
                className="popup__info-image"
                src={cross}
                alt="Галочка подтверждения"
                />
                <h2 className="popup__title popup__title_type_info">Что-то пошло не так! Попробуйте ещё раз.</h2>
    
            </div>
        </div>
    );
}

export default InfoTooltip
