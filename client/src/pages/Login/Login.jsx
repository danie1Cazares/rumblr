

import { useState } from 'react';
import styles from "./Login.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/auth/login', form);

    // Success
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    }
  } catch (err) {
    // Error (like 401 from backend)
    if (err.response && err.response.data.message) {
      setMessage(err.response.data.message);
    } else {
      setMessage('Something went wrong, please try again.');
    }
  }
};

  // CHECK LOGIN STATUS AND RETURN TO PROFILE PAGE IF LOGGED IN
  if (localStorage.getItem('token')) return <Navigate to="/profile" />;


  return (
   
      <Wrapper modifier="login">
        <Container modifier="login">           
                    
                    <form  className={styles["login-form"]}  onSubmit={handleSubmit}>
                        <div className={styles["login-form__brand"]} style={{ display: "flex", alignItems: "center", columnGap: ".5rem" }} ><h3 className={styles["login-form__brand-text"]}>RumblR</h3><img className={styles["login-form__brand-logo"]} src="./rumblr_logo_1_small.png"/></div>
                        <h1 className={styles["login-form__title"]}>Log in</h1>
                        <label className={styles["login-form__label"]} autoComplete='false'  htmlFor="email">Username:</label>
                        <input className={styles["login-form__input"]} autoComplete='false'  required id='email'  onChange={e => setForm({ ...form, email: e.target.value })} />
                        <label className={styles["login-form__label"]} autoComplete='false'    htmlFor="password">Password:</label>
                        <input className={styles["login-form__input"]} autoComplete='false' required id='password'  type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
                        { message && <p className={styles["login-form__error"]} style={{color: '#cb6277'}}>{message}</p>}
                        <p  className={styles["login-form__subtext"]}>Don't have an account? <NavLink className={styles["login-form__link"]}  to='/register' style={{color: '#8f8f8f'}}>Sign up</NavLink></p>
                        <button className={styles["login-form__button"]} type="submit">Login</button>
                    </form>

            <img className={styles["login__background-logo"]}  src="/rumblr_logo_1_large.png" />

      </Container>
    </Wrapper>     
  );
}
