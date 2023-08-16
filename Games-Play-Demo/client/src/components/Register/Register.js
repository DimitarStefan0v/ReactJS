import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/authContext';

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: ''
    }, onRegisterSubmit);

    return (
        <section id="register-page" className="content auth">
            <form id="register" method='POST' onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        value={values.email}
                        onChange={changeHandler}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        value={values.password}
                        onChange={changeHandler}
                        type="password"
                        name="password"
                        id="register-password"
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        value={values.confirmPassword}
                        onChange={changeHandler}
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                    />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};