import React from 'react';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({})
  // const [isEditDeletePopupOpen, setIsDeletePopup] = React.useState(false);
  
  function onCloseEsc (evt) {
    if (evt.key === 'Escape') {closeAllPopups()}
  }
  
  function onCloseOverlay (evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }

  function closeAllPopups () {
    setIsProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsAvatarPopup(false);
    setSelectedCard({});
  }

  return (
  <>
    <div className="page" onKeyDown={(evt) => onCloseEsc(evt)}>
      <Header />
      <Main
        onEditProfile = {() => {setIsProfilePopup(true)}}
        onAddPlace = {() => {setIsAddPlacePopup(true)}}
        onEditAvatar = {() => {setIsAvatarPopup(true)}}
        onSelectedCard = {(selectedCard) => {(setSelectedCard(selectedCard))}}
      />
      <Footer />
    </div>
  
    <PopupWithForm name="Info" title="Редактировать профиль" buttonText="Сохранить"
      isOpen = {(isEditProfilePopupOpen ? ('popup_opened') : '')}
      onClose = {() => {closeAllPopups ()}}
      onCloseOverlay = {(evt) => onCloseOverlay(evt)}
    >
      <>
        <input id="name-input" className="form__text formInfo__text formInfo__text_name" type="text" name="name" placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required/>
        <span className="name-input-error form__message-error"> </span>
        <input id="work-input" className="form__text formInfo__text formInfo__text_work" type="text" name="work" placeholder="Иссдедователь океана" minLength="2" maxLength="200" required/>
        <span className="work-input-error form__message-error"> </span>
      </>
    </PopupWithForm>

    <PopupWithForm name="Add" title="Новое место" buttonText="Создать"
      isOpen = {(isAddPlacePopupOpen ? 'popup_opened' : '')}
      onClose = {() => {closeAllPopups ()}}
      onCloseOverlay = {(evt) => onCloseOverlay(evt)}
    >
      <>
        <input id="title-input" className="form__text formAdd__text formAdd__text_title" type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="title-input-error form__message-error"> </span>
        <input id="link-input" className="form__text formAdd__text formAdd__text_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
        <span className="link-input-error form__message-error"> </span>
      </>
    </PopupWithForm>

    <PopupWithForm name="Avatar" title="Обновить аватар" buttonText="Сохранить"
      isOpen = {(isEditAvatarPopupOpen ? 'popup_opened' : '')}
      onClose = {() => {closeAllPopups ()}}
      onCloseOverlay = {(evt) => onCloseOverlay(evt)}
    >
      <>
        <input id="link-input-avatar" className="form__text formAvatar__text formAvatar__text_link" type="url" name="linkAvatar" placeholder="Ссылка на аватар" required/>
        <span className="link-input-avatar-error form__message-error"> </span>
      </>
    </PopupWithForm>

    <PopupWithForm name="Del" title="Вы уверены?" buttonText="Да"/>

    <ImagePopup 
      onClose = {() => {closeAllPopups ()}}
      onCloseOverlay = {(evt) => onCloseOverlay(evt)}
      card = {selectedCard}>
    </ImagePopup>
  </>
  );
}

export default App;
