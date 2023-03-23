export default class Card {
  constructor(name, link, teplateSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._templateSelector = teplateSelector;
    this.handleCardClick = handleCardClick;
  }

  _handleLikedPhoto() {
    this._likedButtonElement.classList.toggle("card__like_clicked");
  }

  _handleDeletePhoto() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likedButtonElement.addEventListener("click", () => {
      this._handleLikedPhoto();
    });

    this._photoElement.addEventListener("click", () => {
      this.handleCardClick(this._link, this._name);
    });

    this._deleteButtonElement.addEventListener("click", () => {
      this._handleDeletePhoto();
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photoElement = this._element.querySelector(".card__photo");
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;

    this._likedButtonElement = this._element.querySelector(".card__like");
    this._deleteButtonElement = this._element.querySelector(".card__del-btn");

    this._setEventListeners();

    return this._element;
  }
}
