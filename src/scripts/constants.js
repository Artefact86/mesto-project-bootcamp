export const buttonPopupProfile = document.querySelector('.profile__edit-button');
export const buttonPopupPlace = document.querySelector('.profile__add-button');
export const popupElementProfile = document.querySelector('.popup_type_profile');
export const popupElementPlace = document.querySelector('.popup_type_place');
export const popupConteiners = document.querySelector('.popups');
export const nameInputPlace = document.querySelector('.popup__input_type_place');
export const popupInputImagePlace = document.querySelector('.popup__input_type_url');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupFormPlace = document.querySelector('.popup__form_place');

//переменные для работы с карточками попапа profile
export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');
export const nameImputProfile = document.querySelector('.popup__input_type_name');
export const jobInputProfile = document.querySelector('.popup__input_type_job');
export const template = document.querySelector('#template-elements').content.querySelector('.element');
export const popupImg = document.querySelector('.popup_type_img');
export const popupImgType = popupImg.querySelector('.popup__image');
export const popupImgCaption = popupImg.querySelector('.popup__caption');
export const elements = document.querySelector('.elements');
export const profileButton = document.querySelector('.profile__avatar_overlay');
export const formElement = document.querySelector('.popup__form');
export const formInput = formElement.querySelector('.popup__input');
export const formError = formElement.querySelector(`#${formInput.id}-error`);

export const settings = {
    inputError: 'popup__input_error',
    inputErrorActiv: 'form__input-error_active',
    buttonElementInactive: 'popup__save-button_inactive',
};