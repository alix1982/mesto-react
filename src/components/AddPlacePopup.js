import {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';
import FormValidator from './FormValidator.js';

function AddPlacePopup (props) {
  const [newCardName, setCardName] = useState('');
  const [newCardLink, setCardLink] = useState('');
  const userContext = useContext(CurrentUserContext);

  function handleChangeCardName(e) {setCardName(e.target.value)}
  function handleChangeCardLink(e) {setCardLink(e.target.value)}

  useEffect(()=>{
    if (!props.isOpen) {
      setCardName('');
      setCardLink('')
    }
  })

  // function formValidator () {
  //   <FormValidator form = "Add"/>
  // }
  return (
    
    <PopupWithForm  name="Add" title="Новое место" buttonText={props.onTextButton}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {(e)=>{
        e.preventDefault();
        props.onTextButtonSubmit("Сохранение...")
        const newCard = {
          name:newCardName,
          link:newCardLink,
          owner:userContext
        }
        props.onAddPlace(newCard);
      }}
      // onFormValidator = {()=>{formValidator()}}
    >
      <input
        id="title-input" className="form__text formAdd__text formAdd__text_title" type="text" name="title" placeholder="Название"
        minLength="2" maxLength="30" required onChange={handleChangeCardName} value={newCardName}
      />
      <span className="title-input-error form__message-error"></span>
      <input
        id="link-input" className="form__text formAdd__text formAdd__text_link" type="url" name="link" placeholder="Ссылка на картинку"
        required onChange={handleChangeCardLink} value={newCardLink}
      />
      <span className="link-input-error form__message-error"> </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup