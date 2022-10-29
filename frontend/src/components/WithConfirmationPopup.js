import PopupWithForm from './PopupWithForm';

function WithConfirmationPopup({ isOpen, onClose, onSubmit, isLoading }) {

    function handleSubmit(card) {
        onSubmit(card);
    }

    return (
        <PopupWithForm
            name="popup_confirmation"
            title="Вы уверены?"
            buttonText={isLoading ? 'Удаление...' : 'Да'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    );
}

export default WithConfirmationPopup;