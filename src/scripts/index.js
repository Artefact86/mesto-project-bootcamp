import '../pages/index.css'; // добавьте импорт главного файла 
//import { showInputError } from './valid.js';
import { initialCards } from './data.js';

const buttonPopupProfile = document.querySelector('.profile__edit-button');
const buttonPopupPlace = document.querySelector('.profile__add-button');
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupElementPlace = document.querySelector('.popup_type_place');
const popupConteiners = document.querySelector('.popups');

//переменные для работы с карточками попапа place

const nameInputPlace = document.querySelector('.popup__input_type_place');
const popupInputImagePlace = document.querySelector('.popup__input_type_url');
const popupFormPlace = document.querySelector('.popup__form_place');

//переменные для работы с карточками попапа profile
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const nameImputProfile = document.querySelector('.popup__input_type_name');
const jobInputProfile = document.querySelector('.popup__input_type_job');

const template = document.querySelector('#template-elements').content.querySelector('.element');
const popupImg = document.querySelector('.popup_type_img');
const popupImgType = popupImg.querySelector('.popup__image');
const popupImgCaption = popupImg.querySelector('.popup__caption');
const elements = document.querySelector('.elements');

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

// функция открытия попапа
function openPopup(popup){
  popup.classList.add('popup_opened');
};

// функция закрытия попапа
function closePopup(){
  document.querySelector('.popup_opened').classList.remove('popup_opened');
};

// обработчик события открытия попапа профиля при нажитии кнопки
buttonPopupProfile.addEventListener('click', function(){
  openPopup(popupElementProfile);
});

// обработчик события открытия попапа плэйса при нажитии кнопки
buttonPopupPlace.addEventListener('click', function(){
  openPopup(popupElementPlace);
});

// обработчик события закрытия попапа при нажатии кнопки
popupConteiners.addEventListener('click', function(event){
  if(event.target.closest('.popup__close-button') || event.target.classList.contains('popup')) {
    closePopup();
  }
});

// обработчик события добавления новых данных в полях попапа profile
popupElementProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameImputProfile.value;
  profileStatus.textContent = jobInputProfile.value;
  nameImputProfile.value = '';
  jobInputProfile.value = '';
  closePopup();
});

// обработчик события добавления новых данных в полях попапа place
popupFormPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInputPlace.value;
  const link = popupInputImagePlace.value;
  renderCard({name, link});
  closePopup();
});

const renderCard = (data) => {
  const card = createCard(data); 
  elements.prepend(card);
};

// функция создания карточки 
const createCard = (data) => {
  const card = template.cloneNode(true);
  //наполняем данными функцию
  card.querySelector('.element__text').textContent = data.name;
  const imageTemplace = card.querySelector('.element__photo');
  imageTemplace.src = data.link;
  imageTemplace.alt = `Изображение ${data.name}`;
  // навешиваем обработчик собития на кнопку для удаления карточки
  card.querySelector('.element__delete').addEventListener('click', handeDeleteCard);
  // навешиваем на картинку обработчик события
  imageTemplace.addEventListener('click', () => {
    popupImgType.src = data.link;
    popupImgType.alt = `Изображение ${data.name}`;
    popupImgCaption.textContent = data.name;
    openPopup(popupImg);
  });
  const likeButtonElement = card.querySelector('.element__like-button');
  likeButtonElement.addEventListener('click', function(event){
    event.target.classList.toggle('element__like-button_active');
    console.log(event);
  });
  //обязательно возвращаем карточку, иначе она не появится 
  return card;
};
// функция удаления карточки
const handeDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

// автоматическая загрузка карточек 
initialCards.forEach((data) => renderCard(data));

//  for(i = initialCards.length - 1; i >= 0; i-- ){
//    renderCard(initialCards[i]);
// };
  
