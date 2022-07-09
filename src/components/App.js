import {useEffect, useState} from 'react';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopup] = useState(false);
  const [isEditDeletePopupOpen, setIsDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(
    {
      userName: 'Жак-Ив Кусто',
      userDescription: 'Иссдедователь океана',
      userAvatar: '../images/avatar.png'
    }
  );
  const [currentCard, setCurrentCard] = useState([]);
  const [textButtonSubmit, setTextButtonSubmit] =  useState('');
  const [card, setCard] = useState('')
  
  useEffect(()=>{
    api.getUser ()
      .then ((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
    api.getCards ()
      .then ((res) => {
       setCurrentCard(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  useEffect(()=> {
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
    setIsDeletePopup(false)
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
        setTextButtonSubmit('Создать');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCardDelete (card) {
    api.deleteCardDel(card._id, 'DELETE')
      .then (() => {
        setCurrentCard(currentCard => {
          return currentCard.filter( c => {return c._id != card._id})
        })
        closeAllPopups()
      })
      .finally (() => {
        setTextButtonSubmit('Да');
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
      })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile = {() => {
            setIsProfilePopup(true);
            setTextButtonSubmit('Сохранение')
          }}
          onAddPlace = {() => {
            setIsAddPlacePopup(true);
            setTextButtonSubmit('Создать')
          }}
          onEditAvatar = {() => {
            setIsAvatarPopup(true);
            setTextButtonSubmit('Сохранение')
          }}
          onCardDelete={(card) => {
            setIsDeletePopup(true);
            setTextButtonSubmit('Да');
            setCard(card);
          }}
          onCardLike = {handleCardLike}
          onSelectedCard = {(selectedCard) => {setSelectedCard(selectedCard)}}
          onCards = {currentCard}
        />
        <Footer />
      </div>

      <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {(evt) => onCloseOverlay(evt)}
        onUpdateUser = {(currentUser)=> {handleUpdateUser(currentUser)}}
        onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
        onTextButton = {textButtonSubmit}
      />

      <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {(evt) => onCloseOverlay(evt)}
        onAddPlace = {(newCard)=> {handleAddPlace(newCard)}}
        onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
        onTextButton = {textButtonSubmit}
      />

      <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {(evt) => onCloseOverlay(evt)}
        onUpdateAvatar = {(avatarUser)=> {handleUpdateAvatar(avatarUser)}}
        onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
        onTextButton = {textButtonSubmit}
      />

      <DeleteCardPopup
        isOpen = {isEditDeletePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {(evt) => onCloseOverlay(evt)}
        onCardDelete = {(card) => {handleCardDelete(card)}}
        onTextButtonSubmit = {(textButtonSubmit) => {setTextButtonSubmit(textButtonSubmit)}}
        onTextButton = {textButtonSubmit}
        card = {card}
      />

      <ImagePopup 
        onClose = {closeAllPopups}
        onCloseOverlay = {(evt) => onCloseOverlay(evt)}
        card = {selectedCard}>
      </ImagePopup>
    </CurrentUserContext.Provider>
  );
}

export default App;
