import React from 'react';

function PopupWithForm (props) {
  return(
  <>
    <section className={`popup popup${props.name} ${props.isOpen}`} onClick = {props.onCloseOverlay}>
      <div className={`popup${props.name}__cell`}>
        <button className="popup__close" type="button" onClick = {props.onClose}>
        </button>
        <form className={`form form${props.name}`} name={`form${props.name}`} type="submit" onSubmit={(e)=>{props.onSubmit(e)}} noValidate>
          <h2 className={`popup${props.name}__heading`}>
            {props.title}
          </h2>
          {props.children}
          <button className={`form__save form${props.name}__save`} >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  </>
  )
}

export default PopupWithForm