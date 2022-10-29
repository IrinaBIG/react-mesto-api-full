import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(password, email);
    }

    return (
        <div className="start-page">
            <p className="start-page__title">
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className="start-page__form">
                <input placeholder="Email"
                    name="emailInput"
                    onChange={handleChangeEmail}
                    type="email"
                    className="start-page__input"
                    value={email}
                    required
                />
                <input placeholder="Пароль"
                    name="passwordInput"
                    onChange={handleChangePassword}
                    type="password"
                    className="start-page__input"
                    value={password}
                    required
                />
                <button type="submit" className="start-page__button">Зарегистрироваться</button>
            </form>
            <div className="start-page__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="start-page__register-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;