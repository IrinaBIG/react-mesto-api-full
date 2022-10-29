import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { editProfileStartingValues } from '../utils/constants';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, setValues, resetForm } = useFormAndValidation(editProfileStartingValues);

    useEffect(() => {
        if (currentUser.name && currentUser.about && isOpen) {
            resetForm();
            setValues({ firstname: currentUser.name, work: currentUser.about });
        }
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({ name: values["firstname"], about: values["work"] });
    }

    return (
        <PopupWithForm
            name="popup_place_profile"
            title="Редактировать профиль"
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={Object.values(errors).some((item) => item)}
        >
            <input placeholder="Имя"
                name="firstname"
                onChange={handleChange}
                type="text"
                id="name-input"
                className={`form__input form__input_type_name ${errors["firstname"] ? "form__input_type_error" : ''}`}
                value={values["firstname"] || ''}
                required
                minLength="2"
                maxLength="40"
            />
            <span id="name-input-error"
                className={`form__error ${errors["firstname"] ? "form__error_visible" : ''}`}>{errors["firstname"]}</span>
            <input placeholder="О себе"
                name="work"
                onChange={handleChange}
                type="text"
                id="activity-input"
                className={`form__input form__input_type_activity ${errors["work"] ? "form__input_type_error" : ''}`}
                value={values["work"] || ''}
                required
                minLength="2"
                maxLength="200"
            />
            <span id="activity-input-error"
                className={`form__error ${errors["work"] ? "form__error_visible" : ''}`}>{errors["work"]}</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;