const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = `./img/${name}.svg`;

      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "icon1",
      "icon2",
      "icon5",
      "icon4",
      "icon7",
      "icon1",
      "icon2",
      "icon5",
      "icon4",
      "icon7",
    ];
  }

  static random(ctr) {
    let val = 0;
    switch (ctr) {
      case 0:
        val = Math.floor(Math.random() * this.symbols.length);
        break;
      case 1:
        val = 1;
        break;
      case 2:
        val = 4;
        break;
      default:
        val = 3;
        break;
    }
    return this.symbols[val];
  }
}
