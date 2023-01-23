import { initialCards } from './data.js';
import { template, popupImg, popupImgType, popupImgCaption, elements } from './constants.js';
import { openPopup } from './modal.js';


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

  initialCards.forEach((data) => renderCard(data));