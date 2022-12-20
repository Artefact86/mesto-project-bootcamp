const buttonPopupProfile = document.querySelector('.profile__edit-button');
const buttonPopupPlace = document.querySelector('.profile__add-button');
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupElementPlace = document.querySelector('.popup_type_place');
const popupsConteiner = document.querySelector('.popups');
//переменные для работы с карточками попапа place
const formElement = document.querySelector('.popup');
const nameInputPlace = document.querySelector('.popup__input_text');
const popupInputImagePlace = document.querySelector('.popup__input_url');
const popupFormPlace = document.querySelector('.popup__form_place');


//переменные для работы с карточками попапа profile
const popupFormProfile = document.querySelector('.popup__form_profile');
const nameImputProfile = document.querySelector('.popup_input-name');
const jobInputProfile = document.querySelector('.popup_input-job');


const template = document.querySelector('#template-elements').content;
const popupImg = document.querySelector('.popup_type_img');
const elements = document.querySelector('.elements');


const popupCaption = document.querySelector('.popup__caption');

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
popupsConteiner.addEventListener('click', function(event){
  if(event.target.closest('.popup__close-button')) {
    closePopup();
  }
});

// обработчик события добавления новых данных в полях попапа profile
popupElementProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameImputProfile.value;
  const job = jobInputProfile.value;
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
  // навешиваем на картинку обработчик события
  imageTemplace.addEventListener('click', () => {
    openPopup(popupImg);
  });

  //обязательно возвращаем карточку, иначе она не появится 
  return card;
};

//initialCards.forEach(data => renderCardElements());

//for(i = initialCards.length - 1; i >= 0; i-- ){
  //renderCardElements(initialCards[i]);
//};

const likeButtonActive = (event) => {
  event.target.classList.toggle('like__active');
};
 

  

