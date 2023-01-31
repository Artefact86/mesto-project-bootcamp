import { initialCards } from './data.js';
import { template, popupImg, popupImgType, popupImgCaption, elements, profileName } from './constants.js';
import { openPopup } from './modal.js';
import { deleteCard, addLike, removeLike  } from './api.js';
import { data } from 'jquery';




  // функция добавления карточки 
  export const createCard = (data) => {
    console.log(data);
    const card = template.cloneNode(true);
    const trashElement = card.querySelector('.element__delete');
    card.id = data._id;
    //наполняем данными функцию
    card.querySelector('.element__text').textContent = data.name;
    const imageTemplace = card.querySelector('.element__photo');
    imageTemplace.src = data.link;
    imageTemplace.alt = `Изображение ${data.name}`;
    // навешиваем обработчик собития на кнопку для удаления карточки
    //trashElement.addEventListener('click', handeDeleteCard);
    trashElement.addEventListener('click', () => {
       deleteCard(data._id)
       .then(() => {
        document.getElementById(`${card.id}`.remove())
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
    });
    // навешиваем на картинку обработчик события
    imageTemplace.addEventListener('click', () => {
      popupImgType.src = data.link;
      popupImgType.alt = `Изображение ${data.name}`;
      popupImgCaption.textContent = data.name;
      openPopup(popupImg);
    });
    const likeElement = card.querySelector('.element__like-button');
    likeElement.addEventListener('click', likeCard);
    card.querySelector('.element__like-number').textContent = data.likes.length;
    data.likes.forEach((like) => checkLikes(like._id, likeElement));

    //обязательно возвращаем карточку, иначе она не появится 
    return card;
  };
  // функция удаления карточки
  const handeDeleteCard = (event) => {
    event.target.closest('.element').remove();
  };

  export function handeDeleteCardSerever(evt) {
    evt.preventDefault();
    deleteCard(cardId)
      .then((res) => {
        document.getElementById(`${cardId}`.remove())
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
  

  export const renderCard = (data) => {
    elements.prepend(createCard(data));
  };
  
  function likeCard(evt){
    evt.preventDefault();
    const cardLike = evt.target.closest('.element');
    const likeNumber = cardLike.querySelector('.element__like-number');
    if(evt.target.classList.contains('element__like-button_active')) {
      removeLike(cardLike.id)
        .then((res) => {
          checkLikesLength(res._id, res.likes.length, likeNumber, cardLike.id)
          evt.target.classList.remove('element__like-button_active')
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    } else {
      addLike(cardLike.id)
      .then((res) => {
        evt.target.classList.add('element__like-button_active')
        checkLikesLength(res._id, res.likes.length, likeNumber, cardLike.id)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
    }
  }
 
  const checkLikes = (likeItem, likeButton, length ) => {
    const likeNumber = template.querySelector('.element__like-number') 
    if(likeItem === profileName.id) {
      likeButton.classList.add('element__like-button_active');
      likeNumber.textContent += 1
    }
  }

  const checkLikesLength = (id, length, number, cardId) => {
    if (cardId === id) {
        number.textContent = length       
    }
  };
  
  
  