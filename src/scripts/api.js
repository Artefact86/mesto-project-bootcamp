import { config } from './constants.js';

// const tupiCom = fetch('jsonplaceholder.typicode.com/users');
// console.log(tupiCom);
// console.log(config);

export const getResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(getResponse)
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
    })
};

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(getResponse)
    .then((result) => {
        console.log(result);
    })
};

export const addUser = (name, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, job}),
    })
    .then(getResponse)
}

 export const addCard = (name, link) => {
   return fetch(`${config.baseUrl}/cards`, {
     method: 'POST',
     headers: config.headers,
     body: JSON.stringify({name, link})
   })
 }

 export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if(!res.ok){
            return Promise.reject(`Ошибка ${res.status}`);
        }
    })
 }; 