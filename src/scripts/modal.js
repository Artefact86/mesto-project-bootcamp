import { buttonPopupProfile, buttonPopupPlace, popupElementProfile, popupElementPlace, popupConteiners, nameInputPlace,
  popupInputImagePlace, popupAvatar, popupFormPlace, profileName, profileStatus, nameImputProfile, jobInputProfile, template, 
  popupImg, popupImgType, popupImgCaption, elements, profileButton } from "./constants.js";
  
export const renderCard = (data) => {
  const card = createCard(data); 
  elements.prepend(card);
};

// функция создания карточки 
export const createCard = (data) => {
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
  });
  //обязательно возвращаем карточку, иначе она не появится 
  return card;
};
// функция удаления карточки
const handeDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

// функция открытия попапа
export function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc);
  };
  
  // функция закрытия попапа
  export function closePopup(){
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

   