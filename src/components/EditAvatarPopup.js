import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup (props) {
  const inputAvatarRef = React.useRef();
  (inputAvatarRef.current != undefined) && (inputAvatarRef.current.value = '');
  
  return(
    <PopupWithForm name="Avatar" title="Обновить аватар" buttonText={props.onTextButton}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {(e)=>{
        e.preventDefault();
          props.onTextButtonSubmit("Сохранение...");
          props.onUpdateAvatar({
          avatar: inputAvatarRef.current.value
          });
      }}
    >
      <input 
        id="link-input-avatar" className="form__text formAvatar__text formAvatar__text_link"
        type="url" name="linkAvatar" placeholder="Ссылка на аватар" ref={inputAvatarRef}
        required
      />
      <span className="link-input-avatar-error form__message-error"> </span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup