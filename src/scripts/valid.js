import { formElement } from "./constants";

//import { settings } from './constants.js';
export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__save-button",
  inputError: "popup__input_error",
  inputErrorActiv: "form__input-error_active",
  buttonElementInactive: "popup__save-button_inactive",
};


export const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputError);
  errorElement.classList.add(settings.inputErrorActiv);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputError);
  errorElement.classList.remove(settings.inputErrorActiv);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settings) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.buttonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',function() {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButtonState(inputList, buttonElement, settings), 0 })
      
    })
  });
  
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

//функция для проверки на валидность всех полей 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.buttonElementInactive);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.buttonElementInactive);
    buttonElement.disabled = false;
  }
};

