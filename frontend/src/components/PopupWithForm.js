function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit, buttonText, isDisabled }) {
    function handleCloseOverlay(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    return (
        <div className={`popup ${name} ${isOpen && "popup_is-active"}`} onMouseDown={handleCloseOverlay} >
            <div className="popup__content">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <h4 className="popup__title">{title}</h4>
                <form className="form" name={name} onSubmit={onSubmit} noValidate>
                    {children}
                    <button type="submit" className={`form__button ${isDisabled ? 'form__button_disabled' : ''}`}
                        name="save" aria-label="{buttonText}" disabled={isDisabled}>{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;