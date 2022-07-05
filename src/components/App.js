import React, { useEffect } from 'react';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';
import {CurrentCardContext, currentCardContext} from '../contexts/CurrentCardContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(
    {
      userName: 'Жак-Ив Кусто',
      userDescription: 'Иссдедователь океана',
      userAvatar: '../images/avatar.png'
    }
  );
  const [currentCard, setCurrentCard] = React.useState([]);
  const [textButtonSubmit, setTextButtonSubmit] =  React.useState('')

  // const [isEditDeletePopupOpen, setIsDeletePopup] = React.useState(false);
  
  React.useEffect(()=>{
    api.getUser ()
      .then ((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(()=>{
    api.getCards ()
      .then ((res) => {
        setCurrentCard(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  React.useEffect(()=> {
    function onCloseEsc (evt) {
      if (evt.key === 'Escape') {closeAllPopups()}
    }
    document.addEventListener('keydown', onCloseEsc);
    return () => {document.removeEventListener('keydown', onCloseEsc);
    }
  })

  function onCloseOverlay (evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }

  function closeAllPopups () {
    setIsProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsAvatarPopup(false);
    setSelectedCard({});
  }
  function handleUpdateUser (currentUser) {
    api.patchUserInfo (currentUser)
      .then ((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .finally (() => {
        setTextButtonSubmit('Сохранение');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleUpdateAvatar (avatarUser){
    api.patchUserAvatar (avatarUser.avatar)
    .then ((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .finally (() => {
      setTextButtonSubmit('Сохранение');
    })
    .catch((err) => {
      console.log(err)
    })
  }
  function handleAddPlace (newCard) {
    api.postAddCard (newCard)
      .then ((res) => {
        setCurrentCard([res, ...currentCard])
        closeAllPopups()
      })
      .finally (() => {
        setTextButtonSubmit('Сохранение');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCardLike (card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.getCounterLike (card._id, (!isLiked ? 'PUT' : 'DELETE'))
      .then((newCard) => {
        setCurrentCard(currentCard => {
          return currentCard.map( c => {return c._id === card._id ? newCard : c})
        });
      });
  }
  function handleCardDelete (card) {
    api.deleteCardDel(card._id, 'DELETE')
      .then (() => {
        setCurrentCard(currentCard => {
          return currentCard.filter( c => {return c._id != card._id})
        });
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={currentCard}>
        <div className="page">
          <Header />
          <Main
            onEditProfile = {() => {
              setIsProfilePopup(true);
              setTextButtonSubmit('Сохранение')
            }}
            onAddPlace = {() => {
              setIsAddPlacePopup(true);
              setTextButtonSubmit('Сохранение')
            }}
            onEditAvatar = {() => {
              setIsAvatarPopup(true);
              setTextButtonSubmit('Сохранение')
            }}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            onSelectedCard = {(selectedCard) => {setSelectedCard(selectedCard)}}
            onCards = {currentCard}
          />
          <Footer />
        </div>

        <EditProfilePopup 
          isOpen = {(isEditProfilePopupOpen ? ('popup_opened') : '')}
          onClose = {closeAllPopups}
          onCloseOverlay = {(evt) => onCloseOverlay(evt)}
          onUpdateUser = {(currentUser)=> {handleUpdateUser(currentUser)}}
          onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
          onTextButton = {textButtonSubmit}
        />

        <AddPlacePopup
          isOpen = {(isAddPlacePopupOpen ? 'popup_opened' : '')}
          onClose = {closeAllPopups}
          onCloseOverlay = {(evt) => onCloseOverlay(evt)}
          onAddPlace = {(newCard)=> {handleAddPlace(newCard)}}
          onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
          onTextButton = {textButtonSubmit}
        />

        {/* <PopupWithForm name="Add" title="Новое место" buttonText="Создать"
          isOpen = {(isAddPlacePopupOpen ? 'popup_opened' : '')}
          onClose = {closeAllPopups}
          onCloseOverlay = {(evt) => onCloseOverlay(evt)}
        >
          <>
            <input id="title-input" className="form__text formAdd__text formAdd__text_title" type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="title-input-error form__message-error"> </span>
            <input id="link-input" className="form__text formAdd__text formAdd__text_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
            <span className="link-input-error form__message-error"> </span>
          </>
        </PopupWithForm> */}

        <EditAvatarPopup 
          isOpen = {(isEditAvatarPopupOpen ? 'popup_opened' : '')}
          onClose = {closeAllPopups}
          onCloseOverlay = {(evt) => onCloseOverlay(evt)}
          onUpdateAvatar = {(avatarUser)=> {handleUpdateAvatar(avatarUser)}}
          onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
          onTextButton = {textButtonSubmit}
        />

        <PopupWithForm name="Del" title="Вы уверены?" buttonText="Да"/>

        <ImagePopup 
          onClose = {closeAllPopups}
          onCloseOverlay = {(evt) => onCloseOverlay(evt)}
          card = {selectedCard}>
        </ImagePopup>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  
  );
}

export default App;
