import '../pages/index.css'; // добавьте импорт главного файла 
import { showInputError, enableValidation, settings } from './valid.js';
import { initialCards } from './data.js';
import { openPopup, handleSubmitProfile, handleSubmitCard, handleAvatarSubmit, closePopup } from './modal.js';
import { createCard, renderCard, serverDeleteCard } from './card.js'
import { user, getResponse, getUser, getInitialCards, config, addCard, addAvatar } from './api.js';
import { tupiCom, addLike } from './api.js';
import { profileName, profileStatus, elements, popupFormPlace, popupFormProfile, popupFormAvatar, popupDeleteCard,
confirmationCardDelete, avatarPhoto } from './constants';


popupFormPlace.addEventListener('submit', handleSubmitCard);
popupFormProfile.addEventListener('submit', handleSubmitProfile);
popupFormAvatar.addEventListener('submit', handleAvatarSubmit);
confirmationCardDelete.addEventListener('click', () => {serverDeleteCard()});

export let idUser;
   
Promise.all([getInitialCards(), getUser()])
  .then(([cards, profileData]) => {
      profileName.textContent =  profileData.name;
      profileStatus.textContent = profileData.about;
      profileName.id = profileData._id;
      idUser = profileData._id;
      avatarPhoto.src = profileData.avatar;
      cards.reverse().forEach(renderCard);
      enableValidation(settings);
    })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

