import '../pages/index.css'; // добавьте импорт главного файла 
import { showInputError } from './valid.js';
import { initialCards } from './data.js';
import { openPopup } from './modal.js';
import { createCard,  } from './card.js'
import { user, getResponse, getUser, getInitialCards, config } from './api.js';
import { tupiCom } from './api.js';
