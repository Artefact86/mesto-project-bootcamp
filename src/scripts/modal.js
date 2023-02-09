import {
  buttonPopupProfile, buttonPopupPlace, popupElementProfile, popupElementPlace, popupConteiners, nameInputPlace,
  popupInputImagePlace, popupAvatar, popupFormPlace, profileName, profileStatus, nameImputProfile, jobInputProfile,
  profileButton, popupSaveButton, avatarInput, avatarPhoto, popupSaveButtonAvatar, popupSaveButtonPlace, popupSaveButtonProfile,
  buttonTrash
} from "./constants.js";
import { renderCard } from './card.js';
import { renderLoad } from './constants.js';
import { addCard, addAvatar, addUser } from './api.js';
import { idUser } from "./index.js";
// функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
};

// функция закрытия попапа
export function closePopup() {
  const openPopup = document.querySelector('.popup_opened');
  if (!openPopup) return;
  openPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
};

const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

// обработчик события открытия попапа профиля при нажитии кнопки
buttonPopupProfile.addEventListener('click', function () {
  nameImputProfile.value = profileName.textContent;
  jobInputProfile.value = profileStatus.textContent;
  openPopup(popupElementProfile);
});

// обработчик события открытия попапа плэйса при нажитии кнопки
buttonPopupPlace.addEventListener('click', function () {

  openPopup(popupElementPlace);
});

profileButton.addEventListener('click', function () {
  openPopup(popupAvatar);
});

// обработчик события закрытия попапа при нажатии кнопки
popupConteiners.addEventListener('click', function (event) {
  if (event.target.closest('.popup__close-button') || event.target.classList.contains('popup')) {
    closePopup();
  }
});

export function handleSubmitProfile(evt) {
  evt.preventDefault();
  renderLoad(true, popupSaveButtonProfile)
  addUser(nameImputProfile.value, jobInputProfile.value)
    .then(res => {
      profileName.id = res._id,
        profileName.textContent = res.name,
        profileStatus.textContent = res.about
      evt.target.reset();
      closePopup(popupElementProfile);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoad(false, popupSaveButtonProfile)
    })

}

export function handleSubmitCard(evt) {
  evt.preventDefault();
  renderLoad(true, popupSaveButtonPlace, 'Создать', 'Создание...')
  addCard({
    name: `${nameInputPlace.value}`,
    link: `${popupInputImagePlace.value}`
  })
    .then((res) => {
      renderCard(res)
      evt.target.reset();
      closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoad(false, popupSaveButtonPlace, 'Создать', 'Создание...')
    })
}

export function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoad(true, popupSaveButtonAvatar)
  addAvatar(avatarInput.value)
    .then((res) => {
      avatarPhoto.src = res.avatar,
        evt.target.reset();
      closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoad(false, popupSaveButtonAvatar)
    })
}


