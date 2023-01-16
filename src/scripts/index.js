import '../pages/index.css'; // добавьте импорт главного файла 
import { showInputError } from './valid.js';
import { initialCards } from './data.js';
import { openPopup, closePopup, renderCard, createCard } from './modal.js';


// автоматическая загрузка карточек 
initialCards.forEach((data) => renderCard(data));

//  for(i = initialCards.length - 1; i >= 0; i-- ){
//    renderCard(initialCards[i]);
// };
  
