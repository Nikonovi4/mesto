export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = {
            authorization: '23f5b49e-3722-4d4b-b616-4f4f71d989aa',
                "content-type": "application/json"
        }
    }

    getAllCards() {
        return fetch(`${this._url}cards`, {
            method: "GET", 
            headers: this._headers
        })
        .then((res) => {
            return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
          })
        
    }

    addNewCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: "POST", 
            headers: this._headers,
            body: JSON.stringify({name, link}), 
            
        })
        .then((res) => {
          return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
        })
    }

    editProfile(name, activity) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH", 
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: activity
              }) 
            })
        .then((res) => {
          return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
        })
    }

    getProfileInfo() {
        return fetch(`${this._url}users/me`, {
            method: "GET", 
            headers: this._headers,
        })
        .then((res) => {
          return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
        })
    };

    editAvatar(link) {
        return fetch(`${this._url}users/me/avatar` , {
            method: "PATCH", 
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
              }) 
            
        })
        .then((res) => {
          return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
        })
    }

    likedPhoto(cardId) {
            return fetch(`${this._url}cards/${cardId}/likes`, {
                method: "PUT", 
                headers: this._headers,
            })
            .then((res) => {
              return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
            })
    }

    dislikedPhoto(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: "DELETE", 
            headers: this._headers,
        })
        .then((res) => {
          return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
        })
}

    removeCard(cardId) {
        return fetch(`${this._url}cards/${cardId}` , {
            method: "DELETE", 
            headers:this._headers,
        })
        .then((res) => {
        return res.ok? res.json() : Promise.reject(`Ошибка ${res.status}`);
        })
    }
 }

