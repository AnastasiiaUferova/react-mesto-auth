import React, { useState}  from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) =>  {
    
    const [data, setData] = useState({
      password: '',
      email: '',
      message: ''
    })
    
    const {email, password} = data;

    function handleChange(e) {
      const {name, value} = e.target;
      setData({
        ...data,
        [name]: value
      });
    }
  
    function handleSubmit(e){
      e.preventDefault();
      handleRegister(password, email)
            .catch((err) => setData({...data,  message: err.message }))
      }
    


    return (
    <div className="sign-up">
        <div className="sign-up__container">
            <h2 className="sign-up__title">Registration</h2>
            <form name="sign-up-form" className="sign-up__form" onSubmit={handleSubmit}>
            <label htmlFor="email">
                <input id="email" type="email" name="email" onChange={handleChange} value={email} className="sign-up__input sign-up__input_type_email" placeholder="Email" required />
            </label>
            <label htmlFor="password">
                <input id="password" onChange={handleChange} value={password} type="password" name="password" className="sign-up__input sign-up__input_type_password" placeholder="Password" required />
            </label>
                <button className="sign-up__save-button" type="submit">Register</button>
            </form>
            <div className="sign-up__subtitle-container">
                <p className="sign-up__subtitle">Already registered? <Link to="/sign-in" className="sign-up__link"href="#">Login</Link></p>
            </div>
        </div>
    </div>
    ) 
}

export default Register



