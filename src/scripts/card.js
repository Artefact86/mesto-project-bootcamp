import { initialCards } from './data.js';
import {
  template, popupImg, popupImgType, popupImgCaption, elements, profileName, likeButton, popupDeleteCard, confirmationCardDelete,
} from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { deleteCard, addLike, removeLike } from './api.js';
import { idUser } from './index.js';
import { renderLoad } from './constants.js';


// функция добавления карточки 
export const createCard = (data) => {
  //console.log(data);
  const card = template.cloneNode(true);
  const trashElement = card.querySelector('.element__delete');
  const countLike = card.querySelector('.element__like-number');
  const likeElement = card.querySelector('.element__like-button');
  card.id = data._id;
  //наполняем данными функцию
  card.querySelector('.element__text').textContent = data.name;
  const imageTemplace = card.querySelector('.element__photo');
  imageTemplace.src = data.link;
  imageTemplace.alt = `Изображение ${data.name}`;
  isLiked(data, countLike, likeElement);
  if (data.owner._id !== idUser) {
    trashElement.remove()
  } else {
    trashElement.addEventListener('click', handeDeleteCard);
  }
  // навешиваем на картинку обработчик события
  imageTemplace.addEventListener('click', () => {
    popupImgType.src = data.link;
    popupImgType.alt = `Изображение ${data.name}`;
    popupImgCaption.textContent = data.name;
    openPopup(popupImg);
  });

  likeElement.addEventListener('click', () => likeCard(countLike, likeElement));

  //обязательно возвращаем карточку, иначе она не появится 
  return card;
};

export function serverDeleteCard (evt) {
  renderLoad(true, confirmationCardDelete, 'Да', 'Удаление...')
  const deleteCardId = popupDeleteCard.id;
  deleteCard(popupDeleteCard.id)
    .then((res) => {
      popupDeleteCard.id = ''
      document.getElementById(`${deleteCardId}`).remove()
      closePopup(popupDeleteCard)
      handeDeleteCard()
    })
    
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoad(false, confirmationCardDelete, 'Да', 'Удаление...')
    })
} 
// функция удаления карточки
const handeDeleteCard = (event) => {
  event.preventDefault();
  const elementCard = event.target.closest('.element');
  openPopup(popupDeleteCard);
  popupDeleteCard.id = elementCard.id;
};

export const renderCard = (data) => {
  elements.prepend(createCard(data));
};

const likeCard = (countLike, likeElement) => {
  if (likeElement.classList.contains('element__like-button_active')) {
    removeLike(likeElement.closest('.element').id)
      .then((dataCard) => {
        likeElement.classList.remove('element__like-button_active');
        countLike.textContent = dataCard.likes.length;

      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  } else {
    addLike(likeElement.closest('.element').id)
      .then((dataCard) => {
        likeElement.classList.add('element__like-button_active');
        countLike.textContent = dataCard.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка нах: ${err}`)
      })
  }
}

function isLiked(data, countLike, likeElement) {
  if (data.likes.length !== 0) {
    countLike.textContent = data.likes.length;
  }
  data.likes.some((element) => {
    if (element._id === idUser) {
      likeElement.classList.add('element__like-button_active')
    }
  })

}

