import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirm from "./PopupConfirm";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Route, Switch, useHistory  } from 'react-router-dom';
import Login from "./Login"
import Register from "./Register"
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip"
import * as auth from "../utils/auth"


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        tokenCheck()
      }, [])
    
      useEffect(() => {
        if (loggedIn) {
          history.push("/")
        }
      }, [loggedIn, history])

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
    }

    function handleCardClick(data) {
        setSelectedCard({ name: data.name, link: data.link });
        setIsImagePopupOpen(true);
    }

    function handleUpdateUser(userData) {
        return api
            .changeUserInfo(userData)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(userData) {
        return api
            .changeAvatar(userData)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        return api
            .changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(`Error: ${err}`));
    }


    function handleOpenPopupDelete(card) {
        setIsConfirmPopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardDelete(card) {
        return api
            .deleteCard(card._id)
            .then(
                setCards((state) => state.filter((newCard) => newCard._id !== card._id)),
                closeAllPopups()
                )
            .catch((err) => console.log(`Error: ${err}`));
    }

    function handleAddPlaceSubmit(newCard) {
        return api
            .addCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleRegister(password, email) {
        return auth.register(password, email).then(() => {
          history.push('/sign-in');
        });
      }

      //useEffect


      function handleLogin(password, email){
        return auth.authorize(password, email)
            .then((data) => {
              if (data.token){
                localStorage.setItem('jwt', data.token);
                setUserData({email: email});
                setLoggedIn(true);
                history.push('/');
              }
            })
      }


      function tokenCheck() {
        // если у пользователя есть токен в localStorage,
        // эта функция проверит валидность токена
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            // проверим токен
            auth.getContent(jwt).then((data) => {
                if (data) {
                    // здесь можем получить данные пользователя!
                    setUserData({email: data.data.email});
                    setLoggedIn(true);
                    history.push("/");
                }
            });
        }
    }
    
      function handleSignOut () {
        localStorage.removeItem('jwt');
        history.push('/sign-up');
        setLoggedIn(false);
      }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
       
                
                <Header signOut={handleSignOut} userData={userData} />
        
                <Switch>
                
                <ProtectedRoute exact path="/" loggedIn={loggedIn} 
                component={Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                openPopupDelete={handleOpenPopupDelete} 
                onCardLike={handleCardLike} 
                cards={cards}
                />
                <Route path="/sign-up">
                <Register handleRegister={handleRegister} />
                </Route>
                <Route path="/sign-in">
                    <Login handleLogin={handleLogin} />
                </Route>

                </Switch> 

                <Footer />

            
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <PopupConfirm name="confirm" title="Вы уверены?" card={selectedCard} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} ></PopupConfirm>

                <ImagePopup name="pic" card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
                <InfoTooltip />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

