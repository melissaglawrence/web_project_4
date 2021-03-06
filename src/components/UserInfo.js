export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatar }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar,
    };
  }
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
