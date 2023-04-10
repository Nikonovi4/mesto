export default class Card {
  constructor(
    name,
    link,
    teplateSelector,
    { handleCardClick, handleLikePhoto, handleRemoveButtonClick},
    likes,
    cardId,
    myUserId,
    ownerId
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = teplateSelector;
    this.handleCardClick = handleCardClick;
    this.likes = likes;
    this._handleLikePhoto = handleLikePhoto;
    this.cardId = cardId;
    this.myUserId = myUserId;
    this.ownerId = ownerId
    this.handleRemoveButtonClick = handleRemoveButtonClick
  }

  _handleDeletePhoto() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likedButtonElement.addEventListener("click", () => {
        this._handleLikePhoto(this)
    });

    this._photoElement.addEventListener("click", () => {
      this.handleCardClick(this._link, this._name);
    });

    this._deleteButtonElement.addEventListener("click", () => {
       this.handleRemoveButtonClick(this)
      });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  setLikesCounter(likes) {
    this.likesCounter.textContent = likes.length;
    this.likes = likes;
    this._updateLikeView();
  }

  hasCurrentUserLike() {
    return !!this.likes.find((like) => like._id === this.myUserId)
  }

  _updateLikeView() {
   if  (this.hasCurrentUserLike()) {
    this._likedButtonElement.classList.add("card__like_clicked");
   } else {
    this._likedButtonElement.classList.remove("card__like_clicked");
   }
  }

  showDeleteButton() {
    if (this.ownerId === this.myUserId) {
      this._deleteButtonElement.classList.remove('card__del-btn_invisibl')
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photoElement = this._element.querySelector(".card__photo");
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;

    this._likedButtonElement = this._element.querySelector(".card__like");
    this._deleteButtonElement = this._element.querySelector(".card__del-btn");
    this.popupWithConfirm = document.querySelector(".popup__with-confirm")

    this.likesCounter = this._element.querySelector(".likes-counter");
    //this.quantityLikes = this.likes.length;
    this.setLikesCounter(this.likes)
    this._setEventListeners();

    return this._element;
  }
}
