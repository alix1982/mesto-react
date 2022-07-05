import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  const [nameUser, setNameUser] = React.useState('');
  const [descriptionUser, setDescriptionUser] = React.useState('');
  const userContext = React.useContext(CurrentUserContext);
  React.useEffect(()=>{
    setNameUser(userContext.name);
    setDescriptionUser(userContext.about)
  }, [userContext]);

  function handleChangeNameUser(e) {
    setNameUser(e.target.value);
  }
  function handleChangeDescritionUser(e) {
    setDescriptionUser(e.target.value);
  }
  function handleSubmit (e) {
    e.preventDefault();
    props.onTextButtonSubmit("Сохранение...")
    props.onUpdateUser({
      name: nameUser,
      about: descriptionUser,
    });
  }
  return (
  <PopupWithForm  name="Info" title="Редактировать профиль" buttonText= {props.onTextButton}
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onCloseOverlay = {props.onCloseOverlay}
    onSubmit = {(e)=>{handleSubmit(e)}}
  >
    <>
      <input
        id="name-input" className="form__text formInfo__text formInfo__text_name" type="text" name="name"
        placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required onChange={handleChangeNameUser}
      />
      <span className="name-input-error form__message-error"> </span>
      <input 
        id="work-input" className="form__text formInfo__text formInfo__text_work" type="text" name="work" 
        placeholder="Иссдедователь океана" minLength="2" maxLength="200" required onChange={handleChangeDescritionUser}
      />
      <span className="work-input-error form__message-error"> </span>
    </>
  </PopupWithForm>
  )
 
}

export default EditProfilePopup
