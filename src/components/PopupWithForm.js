import React from 'react';

function PopupWithForm (props) {
  return(
  <>
    <section className={`popup popup${props.name} ${props.isOpen}`}>
      <div className={`popup${props.name}__cell`}>
        <button className="popup__close" type="button" onClick = {props.onClose}>
        </button>
        <form className={`form form${props.name}`} name="form" noValidate>
          <h2 className={`popup${props.name}__heading`}>
            {props.title}
          </h2>
          {props.children}
        </form>
      </div>
    </section>
  </>
  )
}

export default PopupWithForm