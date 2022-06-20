import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm.js';
import ImagePopup from './components/ImagePopup.js';
import api from './utils/Api.js';


function App() {
  const [isEditProfilePopupOpen, setIsProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({})
  // const [isEditDeletePopupOpen, setIsDeletePopup] = React.useState(false);
  
  return (
  <>
    <div className="page">
      <Header />
      <Main
        onEditProfile = {
          function handleEditProfileClick () {
            setIsProfilePopup(true);
          }
        }
        onAddPlace = {
          function handleAddPlaceClick () {
            setIsAddPlacePopup(true);
          }
        }
        onEditAvatar = {
          function handleEditAvatarClick () {
            return setIsAvatarPopup(true);
          }
        }
        onSelectedCard = {
          function handleCardClick (selectedCard) {
            return (
              setSelectedCard(selectedCard)
            )
          }
        }
      />

      <Footer />
    </div>

    <PopupWithForm name="Info" title="Редактировать профиль" 
      isOpen = {(isEditProfilePopupOpen ? ('popup_opened') : '')}
      onClose = {
        function closeAllPopups () {
          setIsProfilePopup(false)
        }
      }
    >
      <>
        <input id="name-input" className="form__text formInfo__text formInfo__text_name" type="text" name="name" placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required/>
        <span className="name-input-error form__message-error"> </span>
        <input id="work-input" className="form__text formInfo__text formInfo__text_work" type="text" name="work" placeholder="Иссдедователь океана" minLength="2" maxLength="200" required/>
        <span className="work-input-error form__message-error"> </span>
        <button className="form__save formInfo__save" type="submit">
          Сохранить
        </button>
      </>
    </PopupWithForm>

    <PopupWithForm name="Add" title="Новое место"
      isOpen = {(isAddPlacePopupOpen ? 'popup_opened' : '')}
      onClose = {
        function closeAllPopups () {
          setIsAddPlacePopup(false)
        }
      }
    >
      <>
        <input id="title-input" className="form__text formAdd__text formAdd__text_title" type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="title-input-error form__message-error"> </span>
        <input id="link-input" className="form__text formAdd__text formAdd__text_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
        <span className="link-input-error form__message-error"> </span>
        <button className="form__save formAdd__save" type="submit">
          Создать
        </button>
      </>
    </PopupWithForm>

    <PopupWithForm name="Avatar" title="Обновить аватар"
      isOpen = {(isEditAvatarPopupOpen ? 'popup_opened' : '')}
      onClose = {
        function closeAllPopups () {
          setIsAvatarPopup(false)
        }
      }
    >
      <>
        <input id="link-input-avatar" className="form__text formAvatar__text formAvatar__text_link" type="url" name="linkAvatar" placeholder="Ссылка на аватар" required/>
        <span className="link-input-avatar-error form__message-error"> </span>
        <button className="form__save formAvatar__save" type="submit">
          Сохранить
        </button>
      </>
    </PopupWithForm>

    <PopupWithForm name="Del" title="Вы уверены?">
      <>
        <button className="popupDel__save" type="submit">
          да
        </button>
      </>
    </PopupWithForm>

    <ImagePopup 
      onClose = {
        function closeAllPopups () {
          setSelectedCard({})
        }
      }
      card = {selectedCard}>
    </ImagePopup>
  </>
  );
}

export default App;
