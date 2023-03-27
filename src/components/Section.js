export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItems(element) {
    this._container.prepend(element);
  }

  rendererItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
