import { useState } from 'react';

function Login({ handleLogin }) {

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
        handleLogin(password, email);
    }

    return (
        <div className="start-page">
            <p className="start-page__title">
                Вход
            </p>
            <form onSubmit={handleSubmit} className="start-page__form start-page__form_place-login" noValidate>
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
                    required />
                <button type="submit" className="start-page__button">Войти</button>
            </form>
        </div>
    );
}

export default Login;