export const editProfileStartingValues = {
    inputValues: { firstname: '', work: '' },
    errValues: { firstname: '', work: '' },
    errStates: { firstname: false, work: false }
}

export const addPlaceStartingValues = {
    inputValues: { newPlace: '', newPlace: '' },
    errValues: { newPlace: '', newPlace: '' },
    errStates: { newPlace: false, newPlace: false }
}

export const editAvatarStartingValues = {
    inputValues: { avatarPlace: '' },
    errValues: { avatarPlace: '' },
    errStates: { avatarPlace: false }
}

export const registerStartingValues = {
    inputValues: { emailInput: '', passwordInput: '' },
    errValues: { emailInput: '', passwordInput: '' },
    errStates: { emailInput: false, passwordInput: false }
}

// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : ''; //htttps back