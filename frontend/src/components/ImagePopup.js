function ImagePopup({ name, onClose, card }) {

    function handleCloseOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div className= {`popup ${name} ${card.isOpen && "popup_is-active"}`} onMouseDown={handleCloseOverlay}>
            <div className="popup__image">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <img className="popup__image-card" alt={`${card.card.name}`} src={`${card.card.link}`} />
                <h4 className="popup__title popup__title_place_image">{`${card.card.name}`}</h4>
            </div>
        </div>
    )
}

export default ImagePopup;