import '../pages/index.css'; // добавьте импорт главного файла 
import { showInputError, enableValidation } from './valid.js';
import { initialCards } from './data.js';
import { openPopup, handleSubmitProfile, handleSubmitCard, handleAvatarSubmit, closePopup } from './modal.js';
import { createCard, renderCard, serverDeleteCard } from './card.js'
import { user, getResponse, getUser, getInitialCards, config, addCard, addAvatar } from './api.js';
import { tupiCom, addLike } from './api.js';
import { profileName, profileStatus, elements, popupFormPlace, popupFormProfile, popupFormAvatar, popupDeleteCard,
confirmationCardDelete } from './constants';


popupFormPlace.addEventListener('submit', handleSubmitCard);
popupFormProfile.addEventListener('submit', handleSubmitProfile);
popupFormAvatar.addEventListener('submit', handleAvatarSubmit);
confirmationCardDelete.addEventListener('click', () => {
  serverDeleteCard();
  closePopup(popupDeleteCard);
});

export let idUser;
getUser().then((data) => idUser = data._id);


   
Promise.all([getInitialCards(), getUser()])
  .then(([cards, profileData]) => {
      profileName.textContent =  profileData.name;
      profileStatus.textContent = profileData.about;
      profileName.id = profileData._id;
      cards.reverse().forEach(renderCard);
      enableValidation();
    })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

