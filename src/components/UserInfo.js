export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }
  getUserInfo() {
    const infoData = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return infoData;
  }

  setUserInfo() {
    this._name.textContent = infoData.name;
    this._info.textContent = infoData.info;
  }
}
