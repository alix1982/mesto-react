import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';
//import {CurrentCardContext, currentCardContext} from '../contexts/CurrentCardContext.js'; 

function AddPlacePopup (props) {
  const [newCardName, setCardName] = React.useState({});
  const [newCardLink, setCardLink] = React.useState({});
  //const cardContext = React.useContext(CurrentCardContext);
  const userContext = React.useContext(CurrentUserContext);

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }
  function handleChangeCardLink(e) {
    
    setCardLink(e.target.value);
  }
  
  function handleSubmit (e) {
    e.preventDefault();
    props.onTextButtonSubmit("Сохранение...")
    const newCard = {
      name:newCardName,
      link:newCardLink,
      owner:userContext
    }
    props.onAddPlace(newCard);
  }
  // const inputTitle=document.querySelector('.formAdd__text_title');
  // const inputLink=document.querySelector('.formAdd__text_link');
  //console.log(inputTitle);
  // inputTitle.value = '';
  // inputLink.value = '';

  return (
    <PopupWithForm  name="Info" title="Редактировать профиль" buttonText={props.onTextButton}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {(e)=>{handleSubmit(e)}}
    >
      <>
        <input 
          id="title-input" className="form__text formAdd__text formAdd__text_title" type="text" name="title"
          placeholder="Название" minLength="2" maxLength="30" required onChange={handleChangeCardName}
        />
        <span className="title-input-error form__message-error"> </span>
        <input
          id="link-input" className="form__text formAdd__text formAdd__text_link" type="url" name="link" 
          placeholder="Ссылка на картинку" required onChange={handleChangeCardLink}
        />
        <span className="link-input-error form__message-error"> </span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup