import React from 'react';
import headerLogo from '../images/Vector.svg';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function Header({ email }) {

    const history = useHistory();

    function onSignOut() {
        history.push('/signin');
        localStorage.removeItem('token');
    }

    return (
        <div className="header">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
            <Switch>

                <Route path="/signin">
                    <Link to="/signup" className="header__link">
                        Регистрация
                    </Link>
                </Route>

                <Route path="/signup">
                    <Link to="/signin" className="header__link">
                        Войти
                    </Link>
                </Route>

                <Route path="/main">
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