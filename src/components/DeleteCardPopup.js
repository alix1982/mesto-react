import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup (props) {
  return(
    <PopupWithForm name="Del" title="Вы уверены?" buttonText={props.onTextButton}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {(e)=>{
        e.preventDefault();
        props.onTextButtonSubmit("Удаление...");
        props.onCardDelete(props.card);
      }}
    />
  )
}

export default DeleteCardPopup