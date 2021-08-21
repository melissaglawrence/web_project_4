export default class Section {
    constructor({data, renderer }, classSelector) {
        this._array = data;
        this._renderer = renderer;
        this._classSelector = document.querySelector(classSelector);
    }
    renderItems() {
        this._array.forEach(item => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._classSelector.prepend(element);
    }
}
