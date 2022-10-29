import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { editAvatarStartingValues } from '../utils/constants';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const avatarRef = useRef();
    const { values, handleChange, errors, setValues, resetForm } //isValid,
        = useFormAndValidation(editAvatarStartingValues);

    const [isDisabled, setIsDisabled] = useState(false);
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    useEffect(() => {
        setIsDisabled(errors.avatarPlace);
    }, [errors.avatarPlace]);


    useEffect(() => {
        if (isOpen || onClose) {
            setValues({ avatarPlace: '' });
            resetForm();
            setIsDisabled(true);
        }
    }, [isOpen, onClose, resetForm, setValues]);

    return (
        <PopupWithForm
            name="popup_place_avatar"
            title="Обновить аватар"
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={isDisabled}
        >
            <input
                name="avatarPlace"
                type="url"
                ref={avatarRef}
                id="avatar-input"
                className={`form__input form__input_type_avatar-place ${errors["avatarPlace"] ? "form__input_type_error" : ''}`}
                value={values["avatarPlace"] || ''}
                onChange={handleChange}
                placeholder="Ссылка на картинку"
                required />

            <span
                id="avatar-input-error"
                className={`form__error ${errors["avatarPlace"] ? "form__error_visible" : ''}`}>
                {errors["avatarPlace"]}
            </span>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;


// import { useRef, useEffect } from 'react';
// import PopupWithForm from './PopupWithForm';
// import { useFormAndValidation } from '../hooks/useFormAndValidation';
// import { editAvatarStartingValues } from '../utils/constants';

// function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

//     const avatarRef = useRef();
//     const { values, handleChange, errors, setValues, isValid, resetForm }
//         = useFormAndValidation(editAvatarStartingValues);

//     function handleSubmit(e) {
//         e.preventDefault();
//         onUpdateAvatar(avatarRef.current.value);
//     }

//     useEffect(() => {
//         if (isOpen) {
//             resetForm();
//             setValues({ avatarPlace: '' });
//         }
//     }, [isOpen]);

//     return (
//         <PopupWithForm
//             name="popup_place_avatar"
//             title="Обновить аватар"
//             buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
//             isOpen={isOpen}
//             onClose={onClose}
//             onSubmit={handleSubmit}
//             isDisabled={Object.values(errors).some((item) => item)}
//         >
//             <input
//                 name="avatarPlace"
//                 type="url"
//                 ref={avatarRef}
//                 id="avatar-input"
//                 className={`form__input form__input_type_avatar-place ${errors["avatarPlace"] ? "form__input_type_error" : ''}`}
//                 value={values["avatarPlace"] || ''}
//                 onChange={handleChange}
//                 placeholder="Ссылка на картинку"
//                 required />

//             <span
//                 id="avatar-input-error"
//                 className={`form__error ${errors["avatarPlace"] ? "form__error_visible" : ''}`}>
//                 {errors["avatarPlace"]}
//             </span>

//         </PopupWithForm>
//     );
// }

// export default EditAvatarPopup;