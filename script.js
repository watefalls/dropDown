class CustomSelect {
  #id;
  #options;
  #currentSelectedOption;

  constructor(id, options) {
    this.#id = id;
    this.#options = options;
  }

  get selectedValue() {
    return this.#currentSelectedOption;
  }

  render(container) {
    let div = document.createElement("div");
    let button = document.createElement("button");
    let span = document.createElement("span");
    let ul = document.createElement("ul");

    div.className = `select-dropdown select-dropdown--${this.#id}`;
    div.setAttribute('id', 'wraper');
    button.className = `select-dropdown__button select-dropdown__button--${this.#id}`;
    span.className = `select-dropdown select-dropdown--${this.#id}`;
    ul.className = `select-dropdown__list select-dropdown__list--${this.#id}`;
    ul.setAttribute('id', 'list');


    span.textContent = "Выберите Элемент";
    button.append(span);
    div.append(button, ul);

    for (let item of this.#options) {
      let li = document.createElement("li");
      li.className = "select-dropdown__list-item";
      li.textContent = item.text;
      li.dataset.value = item.value;
      ul.append(li);
      li.onclick = CustomSelect.#li_click;
    }

    container.append(div);

    button.onclick = CustomSelect.#button_click;
  }

  static #button_click(e) {
    e.preventDefault();
    let self = e.currentTarget;
    let wraper = self.closest('[id="wraper"]');
    let list = wraper.querySelector('[id="list"]');
    list.classList.toggle('active');
  }

  static #li_click(e) {
    let { target } = e;
    let id = target.dataset.value;
    let text = target.textContent;
    CustomSelect.selectedValue = {id, text};
    e.currentTarget.closest('[id="wraper"]').querySelector('span').textContent = text;
    // e.currentTarget.closest('[id="wraper"]').querySelector('ul').classList.remove('active');
    let list = e.currentTarget.closest('[id="wraper"]').querySelector('ul').children
    for(let item of list){
      item.classList.remove('selected');
    }
    target.classList.add('selected');
    console.log(CustomSelect.selectedValue);
  }
}


const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
];


const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container');
customSelect.render(mainContainer);