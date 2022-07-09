import {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  const userContext = useContext(CurrentUserContext);
  const [nameUser, setNameUser] = useState(userContext.name);
  const [descriptionUser, setDescriptionUser] = useState(userContext.about);
  
  useEffect(()=>{
    setNameUser(nameUser);
    setDescriptionUser(descriptionUser);
    props.isOpen && setNameUser(userContext.name);
    props.isOpen && setDescriptionUser(userContext.about);
  }, [userContext, props.isOpen]);

  function handleChangeNameUser(e) {
    setNameUser(e.target.value);
  }
  function handleChangeDescritionUser(e) {
    setDescriptionUser(e.target.value);
  }

  return (
  <PopupWithForm  name="Info" title="Редактировать профиль" buttonText= {props.onTextButton}
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onCloseOverlay = {props.onCloseOverlay}
    onSubmit = {(e)=>{
      e.preventDefault();
      props.onTextButtonSubmit("Сохранение...")
      props.onUpdateUser({
        name: nameUser,
        about: descriptionUser,
      });
    }}
  >
    <input
      id="name-input" className="form__text formInfo__text formInfo__text_name" type="text" name="name" placeholder="Жак-Ив Кусто"
      minLength="2" maxLength="40" required onChange={handleChangeNameUser} value={nameUser || ''}
    />
    <span className="name-input-error form__message-error"> </span>
    <input 
      id="work-input" className="form__text formInfo__text formInfo__text_work" type="text" name="work" placeholder="Иссдедователь океана"
      minLength="2" maxLength="200" required onChange={handleChangeDescritionUser} value={descriptionUser || ''}
    />
    <span className="work-input-error form__message-error"> </span>
  </PopupWithForm>
  )
}

export default EditProfilePopup
