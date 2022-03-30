import React from 'react' 
import { Link } from "react-router-dom";
import { useState} from "react";


function Login({ handleLogin }) { 

    const [data, setData] = useState({
        email: '',
        password: '',
        message: ''
      })


      const {password, email} = data;

      function handleChange(e) {
        const {name, value} = e.target;
        setData({
          ...data,
          [name]: value
        });
      }
    
      function handleSubmit(e){
        e.preventDefault();
        if (!email || !password){
            return;
          }
        handleLogin(password, email)
              .catch((err) => setData({...data,  message: err.message }))
        }


    return (
    <div className="sign-up">
        <div className="sign-up__container">
            <h2 className="sign-up__title">Вход</h2>
            <form name="sign-up-form" className="sign-up__form" onSubmit={handleSubmit}>
                <input id="login-email-input" type="email" name="email" onChange={handleChange} value={email} className="sign-up__input sign-up__input_type_email" placeholder="Email" required />
                <input id="login-password-input" type="password" name="password" onChange={handleChange} value={password} className="sign-up__input sign-up__input_type_password" placeholder="Пароль" required />
                <button className="sign-up__save-button" type="submit">Войти</button>
            </form>
        </div>
    </div>
    ) 
}

export default Login