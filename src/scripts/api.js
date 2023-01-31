import { config } from './constants.js';

const getResponse = (res) => {
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
};

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(getResponse)

};

export const addUser = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(getResponse)
}

 export const addCard = (data) => {
   return fetch(`${config.baseUrl}/cards`, {
     method: 'POST',
     headers: config.headers,
     body: JSON.stringify({
        name: data.name, 
        link: data.link
    })
   })
   .then(getResponse)
 }

export const addLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(getResponse)
    .then((res) => {
        console.log(res);
    })
}

export const removeLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getResponse)
}

 export const addAvatar = (avatar) => {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: avatar
    })
   })
   .then(getResponse)
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
 