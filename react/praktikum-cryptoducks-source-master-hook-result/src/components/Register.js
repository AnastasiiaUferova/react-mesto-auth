import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Register.css';

const Register = ({ handleRegister }) =>  {
  const [data, setData] = useState({
    username: 'test',
    email: 'test@test.ru',
    password: 'test',
    confirmPassword: 'test',
    message: ''
  })
  const { username, email, password, confirmPassword, message } = data;
  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    if (password === confirmPassword) {
      handleRegister(username, password, email)
          .catch((err) => setData({...data,  message: err.message }))
    }
  }

  return(
    <div className="register">
      <Logo title={'CryptoDucks'}/>
      <p className="register__welcome">
        Пожалуйста, зарегистрируйтесь.
      </p>
      <p className="register__error">
        {message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input id="username" name="username" type="text" value={username} onChange={handleChange} />
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" value={email} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" name="password" type="password" value={password} onChange={handleChange} />
        <label htmlFor="confirmPassword">
          Подтвердите пароль:
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  )

}

export default Register;
