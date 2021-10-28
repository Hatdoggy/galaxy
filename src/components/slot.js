import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import { blink } from "../func.js";

export default class Slot {
  constructor(domElement, config = {}) {
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

    this.spinButton = document.querySelectorAll(".spinBtn");
    this.spinButton.forEach((elem) => {
      elem.addEventListener("click", () => this.spin(0));
    });

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

// export { Slots };

// const Spins = () => {
//   return (
//     <div className="flx flx-jc-sb flx-ai-ce doors z-bg pos-abs p-20 spinCont">
//       <span className="brd-50 bg-wht h-100 w-30 shdw door ovr-hide trans">
//         <div className="boxes"></div>
//       </span>
//       <span className="brd-50 bg-wht h-100 w-30 shdw door ovr-hide trans">
//         <div className="boxes"></div>
//       </span>
//       <span className="brd-50 bg-wht h-100 w-30 shdw door ovr-hide trans">
//         <div className="boxes"></div>
//       </span>
//       <span className="brd-50 bg-wht h-100 w-30 shdw door ovr-hide trans">
//         <div className="boxes"></div>
//       </span>
//       <span className="brd-50 bg-wht h-100 w-30 shdw door ovr-hide trans">
//         <div className="boxes"></div>
//       </span>
//       <span className="brd-50 bg-wht h-100 w-30 shdw door ovr-hide trans">
//         <div className="boxes"></div>
//       </span>
//     </div>
//   );
// };

export { Spins };
