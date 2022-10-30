import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import WithConfirmationPopup from './WithConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoTooltip';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { useHistory } from 'react-router';
import * as auth from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupWithConfirmation, setIsPopupWithConfirmation] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [removeCard, setRemoveCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [ifRegOk, setIfRegOk] = useState(false);
  const [email, setEmail] = useState('');
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const isOpen = isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isTooltipPopupOpen ||
    selectedCard ||
    isPopupWithConfirmation;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleTooltipPlaceClick() {
    setIsTooltipPopupOpen(!isTooltipPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, card: card });
  }

  function handleCardDeletePopup(card) {
    setIsPopupWithConfirmation(!isPopupWithConfirmation);
    setRemoveCard(card)
  }

  function handleCardDelete(e) {
    e.preventDefault()
    // Снова проверяем ../
    const isOwn = removeCard.owner._id === currentUser._id;
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(removeCard._id, !isOwn)
      .then(() => {
        setCards((state) => state.filter((res) => res._id !== removeCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    console.dir(card);

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        console.dir(newCard);
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.updateAvatar(data)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsPopupWithConfirmation(false)
    setSelectedCard({ isOpen: false, card: {} })
    setIsTooltipPopupOpen(false)
  }

  function handleLogin(password, email) {
    if (!password || !email) {
      return;
    }
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/main');
        }
      })
      .catch(err => console.log(err));
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        console.log(res.user);
        setIfRegOk(true);
        history.push('/signin');
      })
      .catch((err) => {
        setIfRegOk(false);
        console.log(err);
      })
      .finally(() => {
        handleTooltipPlaceClick();
      })
  }

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([profile, {data: cards}]) => {
        setCurrentUser(profile);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem('token');
    if (jwt) {
      // здесь будем проверять токен
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            const email = (res.email);
            setEmail(email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch(console.dir)
    }
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            email={email}
          />

          <Switch>
            <ProtectedRoute
              exact path="/main"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardDeletePopup={handleCardDeletePopup}
              onCardLike={handleCardLike}
              cards={cards}
            />

            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
              />
            </Route>

            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
            </Route>

          </Switch>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <ImagePopup
            name="place_image-card"
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <WithConfirmationPopup
            isOpen={isPopupWithConfirmation}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />

          <InfoToolTip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            ifRegOk={ifRegOk}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;