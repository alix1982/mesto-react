import React from 'react';

function FormValidator (props) {

    const obj = {
      formSelector: '.form',
      inputSelector: '.form__text',
      buttonSelector: '.form__save',
      inactiveButtonClass: 'form__save_disable',
      inputErrorClass: 'form__text_error',
      errorClass: 'form__message-error'
    };

//       props.form = form;
      const inputList = Array.from(props.form.querySelectorAll(obj.inputSelector));
      const button = props.form.querySelector(obj.buttonSelector);


    function _addTextError (inputElement, inputErrorClass) {
      const span = document.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(inputErrorClass);
      span.textContent = inputElement.validationMessage;
    };
  
    function _removeTextError (inputElement, inputErrorClass) {
      const span = document.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      span.textContent = ' ';
    };
  
    function _activeButton () {
      return inputList.some(function(inputElement) {
        return (!inputElement.validity.valid)
      });
    };
    
    function toggleButtonState () {
      if (_activeButton()) {
        button.classList.add(obj.inactiveButtonClass);
        button.setAttribute('disabled', true)
      }
      else {
        button.classList.remove(obj.inactiveButtonClass);
        button.removeAttribute('disabled', true);
      };
    };
    function enableValidation () {
      inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
          if (!evt.target.validity.valid) {_addTextError (input, obj.inputErrorClass)}
          else {_removeTextError(input, obj.inputErrorClass)};
          toggleButtonState();
        });
      });
    };
    
  return enableValidation ()
    
}

export default FormValidator