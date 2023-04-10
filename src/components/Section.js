export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItems(element) {
    this._container.prepend(element);
  }

  rendererItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
