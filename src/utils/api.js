class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
            .then(this._handleResponse);
    }

    addCard(data) {
        return fetch(this._address + "/cards", {
            method: "POST",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
            .then(this._handleResponse)
    }

    getUserInfo () {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
        .then(this._handleResponse);
    }

    changeUserInfo (data) {
        return fetch(`${this._address}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        })
    })
    .then(this._handleResponse);
    
    }


    deleteCard(cardId) {
        return fetch (`${this._address}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: this._token
        }}).then(this._handleResponse);
    }

    changeAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: data.avatar
        })
    })
    .then(this._handleResponse);
    
}


    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/likes/${id}`, {
          method: isLiked ? 'DELETE' : 'PUT',
          headers: {
            authorization: this._token,
            "Content-Type": "application/json",
        },
        })
          .then(this._handleResponse)
      }



    }




const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort-35",
    token: "122002ae-02b5-4087-9c3a-b65f83b6a7d9",
});

export default api