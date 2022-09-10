import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import { blink } from "../func.js";

export default class Slot {
  constructor(domElement, config = {}) {
    
    this.spinning = 1;

    Symbol.preload();

    this.currentSymbols = [
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
    ];

    this.nextSymbols = [
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
      ["icon2", "icon2", "icon2"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

      setTimeout(()=>{
        this.spinButton = document.querySelectorAll(".spinBtn");
        this.spinButton.forEach((elem) => {
          elem.addEventListener("click", () => this.spin(0));
        });
      },1500)

    if (config.inverted) {
      this.container.classList.add("inverted");
    }
  }

  spin(check) {
    let blinking = false;
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;
    switch (check) {
      case 0:
        this.nextSymbols = [
          [Symbol.random(0), Symbol.random(0), Symbol.random(2)],
          [Symbol.random(1), Symbol.random(1), Symbol.random(1)],
          [Symbol.random(0), Symbol.random(0), Symbol.random(1)],
          [Symbol.random(3), Symbol.random(3), Symbol.random(3)],
          [Symbol.random(0), Symbol.random(0), Symbol.random(2)],
        ];
        break;
      case 1:
        this.nextSymbols = [
          [Symbol.random(1), Symbol.random(2), Symbol.random(1)],
          [Symbol.random(3), Symbol.random(2), Symbol.random(3)],
          [Symbol.random(1), Symbol.random(2), Symbol.random(1)],
          [Symbol.random(3), Symbol.random(2), Symbol.random(3)],
          [Symbol.random(1), Symbol.random(2), Symbol.random(1)],
        ];
        blinking = true;
        break;
      case 2:
        this.nextSymbols = [
          [Symbol.random(0), Symbol.random(1), Symbol.random(3)],
          [Symbol.random(0), Symbol.random(1), Symbol.random(1)],
          [Symbol.random(0), Symbol.random(1), Symbol.random(3)],
          [Symbol.random(0), Symbol.random(1), Symbol.random(3)],
          [Symbol.random(0), Symbol.random(1), Symbol.random(1)],
        ];
        blinking = true;
        break;
      default:
        break;
    }

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(blinking));
  }

  onSpinStart() {
    this.spinButton.disabled = true;
  }

  onSpinEnd(blinking) {
    if (blinking) {
      blink();
    }
  }
}

const Spins = (props) => {
  const { pop, mob, spin } = props;

  return (
    <div id="slot" className="z-bg p-20 trans">
      <div id="reels">
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
      </div>
    </div>
  );
};

export { Spins };
