export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  userAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  createNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "76dcd78a-c08a-4542-9970-ac94148167e2",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }
}
