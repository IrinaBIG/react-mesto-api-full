import React from 'react';

function Footer() {
    return (
        <div className="footer">
            <p className="footer__author">&copy; {new Date().getFullYear()}. Mesto Russia</p>
        </div>

    );
}

export default Footer;
