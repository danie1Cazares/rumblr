import { useState } from 'react';
import api from '../../api';
import styles from "./Register.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";

import { NavLink, useNavigate } from 'react-router-dom';


export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  //REGISTER USER
//   try {
//       await api.post('/auth/register', form);

//     // Success
//       setMessage('Account registered! Redirecting...')

//       setTimeout(() => {
//             navigate('/');
//       }, 2000);
    
//   } catch (err) {
//     // Error (like 401 from backend)
//     if (err.response && err.response.data.message) {
//       setMessage(err.response.data.message);
//     } else {
//       setMessage('Something went wrong, please try again.');
//     }
//   }
};



  return (

      <Wrapper modifier="register">
        <Container modifier="register">  
                    <form className={styles["register-form"]} onSubmit={handleSubmit}>
                        <div className={styles["register-form__brand"]} style={{display:"flex",alignItems:"center",columnGap:".5rem"}}>
                        <h3 className={styles["register-form__brand-text"]}>RumblR</h3>
                        <img className={styles["register-form__brand-logo"]} src="/rumblr_logo_1_small.png"/>
                        </div>
                        <h1 className={styles["register-form__title"]}>Register</h1>
                        <label className={styles["register-form__label"]} autoComplete="false" htmlFor="name">Name:</label>
                        <input className={styles["register-form__input"]} autoComplete="false" id="name" onChange={e=>setForm({...form,name:e.target.value})} required/>
                        <label className={styles["register-form__label"]} autoComplete="false" htmlFor="email">Username:</label>
                        <input className={styles["register-form__input"]} autoComplete="false" id="email" onChange={e=>setForm({...form,email:e.target.value})} required/>
                        <label className={styles["register-form__label"]} autoComplete="false" htmlFor="password">Password:</label>
                        <input className={styles["register-form__input"]} autoComplete="false" id="password" type="password" onChange={e=>setForm({...form,password:e.target.value})} required/>
                        <label className={styles["register-form__label"]} autoComplete="false" htmlFor="confirm-password">Confirm Password:</label>
                        <input className={styles["register-form__input"]} autoComplete="false" id="confirm-password" type="password" onChange={e=>setForm({...form,confirmPassword:e.target.value})} required/>
                        {message&&<p className={styles["register-form__error"]} style={{color:"#cb6277"}}>{message}</p>}
                        <p className={styles["register-form__subtext"]}>Already have an account? <NavLink className={styles["register-form__link"]} to="/" style={{color:"#8f8f8f"}}>Log in</NavLink></p>
                        <button className={styles["register-form__button"]} type="submit">Sign up</button>
                    </form>
            <img className={styles["register__background-logo"]} src="/rumblr_logo_1_large.png"/>
      </Container>
    </Wrapper>
      

  );
}
