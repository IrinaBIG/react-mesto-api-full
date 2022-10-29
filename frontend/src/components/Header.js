import React from 'react';
import headerLogo from '../images/Vector.svg';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function Header({ email }) {

    const history = useHistory();

    function onSignOut() {
        localStorage.removeItem('token');
        history.push('/sign-in');
    }

    return (
        <div className="header">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
            <Switch>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                </Route>

                <Route path="/">
                    <div className="header__user-data">
                        {email}
                    </div>

                    <button className="header__link-exit" onClick={onSignOut} type="button">
                        Выйти
                    </button>
                </Route>

            </Switch>

        </div>
    );
}

export default Header;