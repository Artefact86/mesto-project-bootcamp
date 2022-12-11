const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popUp = document.querySelector('.popup');

buttonEdit.addEventListener('click', function(){
    popUp.classList.add('popup_opened');
});

buttonClose.addEventListener('click', function(){
    popUp.classList.remove('popup_opened');
})

const likeButton = document.querySelector('.element__content_like');
 
likeButton.addEventListener('click', function(){
  likeButton.classList.add('like__active');
});




