import { buttonPopupProfile, buttonPopupPlace, popupElementProfile, popupElementPlace, popupConteiners, nameInputPlace,
  popupInputImagePlace, popupAvatar, popupFormPlace, profileName, profileStatus, nameImputProfile, jobInputProfile,
   profileButton } from "./constants.js";
   import { renderCard, createCard, getInitialCards } from './card.js'
  
// функция открытия попапа
export function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc);
  };
  
  // функция закрытия попапа
  function closePopup(){
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEsc);
  };

  const handleEsc = (evt) => {
    if(evt.key === 'Escape'){
      closePopup();
    }
   };
  
  // обработчик события открытия попапа профиля при нажитии кнопки
  buttonPopupProfile.addEventListener('click', function(){
    nameImputProfile.value = profileName.textContent;
    jobInputProfile.value = profileStatus.textContent;
    openPopup(popupElementProfile);
  });
  
  // обработчик события открытия попапа плэйса при нажитии кнопки
  buttonPopupPlace.addEventListener('click', function(){
    
    openPopup(popupElementPlace);
  });

  profileButton.addEventListener('click', function(){
    openPopup(popupAvatar);
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
    popupFormPlace.reset();
  });

   