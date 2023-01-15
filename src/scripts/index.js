import '../pages/index.css'; // добавьте импорт главного файла 
import { showInputError } from './valid.js';

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8JUQwJUJBJUQwJUIwJUQwJUJDJUQxJTg3JUQwJUIwJUQxJTgyJUQwJUJBJUQwJUIwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Санк-Петербург',
    link: 'https://media.istockphoto.com/id/152975250/ru/фото/ночной-город-и-канал-и-собор.jpg?s=612x612&w=0&k=20&c=P0WVPTADIwA3Hg5teablLnB8GDuHBb3EbItOhsuwJIU='
  },
  {
    name: 'Кольский',
    link: 'https://media.istockphoto.com/id/507518886/ru/фото/хибины-зимой.jpg?s=612x612&w=0&k=20&c=D37R-qGr_xCKenu2rtBgYWvNisZ7x7lWGZoOuhE_NWc='
  }
];

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
  
