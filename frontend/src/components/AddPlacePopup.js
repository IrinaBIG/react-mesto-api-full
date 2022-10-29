import React from 'react';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { addPlaceStartingValues } from '../utils/constants';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const { values, handleChange, errors, setValues, resetForm }
        = useFormAndValidation(addPlaceStartingValues);

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIsDisabled(errors.newPlace || errors.linkPlace);
    }, [errors.newPlace, errors.linkPlace]);

    useEffect(() => {
        if (isOpen || onClose) {
            setValues({ newPlace: '', linkPlace: '' });
            resetForm();
            setIsDisabled(true);
        }
    }, [isOpen, onClose, resetForm, setValues]);

    function handleAddPlaceSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({ name: values["newPlace"], link: values["linkPlace"] });
    }

    return (
        <PopupWithForm
            name="popup_place_add-card"
            title="Новое место"
            buttonText={isLoading ? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
            isDisabled={isDisabled}
        >
            <input
                name="newPlace"
                type="text"
                id="place-input"
                className={`form__input form__input_type_place ${errors["newPlace"] ? "form__input_type_error" : ''}`}
                value={values["newPlace"] || ''}
                onChange={handleChange}
                placeholder="Название"
                required
                minLength="2"
                maxLength="40"
            />

            <span
                id="place-input-error"
                className={`form__error ${errors["newPlace"] ? "form__error_visible" : ''}`}>
                {errors["newPlace"]}
            </span>

            <input
                name="linkPlace"
                type="url"
                id="link-input"
                className={`form__input form__input_type_link-place ${errors["linkPlace"] ? "form__input_type_error" : ''}`}
                value={values["linkPlace"] || ''}
                onChange={handleChange}
                placeholder="Ссылка на картинку"
                required
            />

            <span
                id="link-input-error"
                className={`form__error ${errors["linkPlace"] ? "form__error_visible" : ''}`}>
                {errors["linkPlace"]}
            </span>

        </PopupWithForm>
    );
}

export default AddPlacePopup;
