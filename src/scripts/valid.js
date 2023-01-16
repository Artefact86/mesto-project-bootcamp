const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);

const errorMessage = {
  empty: 'Вы пропустили это поле',
  wrongLenght: 'Введите от 2 до 30 символов',
  wrongUrl: 'Тут должна быть ссылка',
};


export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button');
  //toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',function() {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
    
  });
  
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

//функция для проверки на валидность всех полей 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
};

// // переменные для работы с валидацией формы 
// const formAddProfile = document.forms.user;
// const formAddPlace = document.forms.newPlace;

// export const errorMessage = {
//   empty: 'Вы пропустили это поле',
//   wrongLenght: 'Введите от 2 до 30 символов',
//   wrongUrl: 'Тут должна быть ссылка',
// };

// // const hasInvalidInput = (inputList) => {
// //     return inputList.some((input) => {
// //         return !input.validity.valid;
// //     });
// // };

// // const toggleButtonState = (inputList, buttonSave) => {

// // }

// const sendingForm = (evt) => {
//   evt.preventDefault();
//   const currentForm = evt.target;
//   if(currentForm.checkValidity()){
//     console.log('всё путём');
//   } else {
//     console.log('что-то не так');
//   }
// };

// const isValid = (input) => {
//   input.setCustomValidity('');

//   if (input.validity.valueMissing) {
//    input.setCustomValidity(errorMessage.empty);
//    return false;
//   }

//   if (input.validity.tooShort || input.validity.tooLong) {
//    input.setCustomValidity(errorMessage.wrongLenght);
//    return false;
//   }

//   if (input.validity.typeMismatch && input.type === 'url') {
//     input.setCustomValidity(errorMessage.wrongUrl);
//    return false;
//   }

//   return input.checkValidity();
// };

// const isInputValid = (input) => {
//   const currentSpan = input.parentNode.querySelector(`#${input.id}-error`);
//   isValid(input);

//   currentSpan.textContent = input.validationMessage;
// };

// export const setButtonDisable = (button, state) => {
//   if(state) {
//     button.setAttribute('disable', true);
//     button.classList.add('popup__save-button_inactive');
//     button.classList.remove('popup__save-button');
    
//   } else {
//     button.removeAttribute('disable', true);
//     button.classList.add('popup__save-button');
//     button.classList.remove('popup__save-button_inactive');
//   }
// };

// export const handleFormInput = (evt) => {
//   const currentForm = evt.currentTarget;
//   const buttonSave = currentForm.querySelector('.button');
//   if(currentForm.checkValidity()){
//     setButtonDisable(buttonSave, true);
//   } else {
//     setButtonDisable(buttonSave, false);
//   };

//   isInputValid(evt.target);
// };



// formAddProfile.addEventListener('submit', sendingForm);
// formAddProfile.addEventListener('input', handleFormInput);

// formAddPlace.addEventListener('submit', sendingForm);
// formAddPlace.addEventListener('input', handleFormInput);