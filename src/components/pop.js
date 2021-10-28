import spin, { drop, hide, find, ActionRedirect, blink } from "../func";
import { useEffect } from "react";
import Slot from "./slot";

const config = {
  inverted: true, // true: reels spin from top to bottom; false: reels spin from bottom to top
};
const check = [5, 4, 3, 1];

const Welcome = (props) => {
  const { pop, upd, mob, spin, set } = props;

  const clicked = async () => {
    await hide();
    upd({
      ...pop,
      show: false,
      welc: false,
      lose: true,
    });
    setTimeout(() => {
      spin(true);
    }, 2500);
  };

  return (
    <div className="flx flx-col flx-jc-sp flx-ai-ce h-100">
      <h4 className="days txt-wht w-100 txt-al-ce">
        {window.txt.pop.wel.head}
      </h4>
      <img src={window.txt.pop.wel.img} alt="astro" className="w-30" />
      <h4 className="w-100 txt-al-ce txt-wht days">
        {window.txt.pop.wel.bold}
      </h4>
      <p className="w-100 txt-al-ce txt-wht mono">{window.txt.pop.wel.mes}</p>
      <button className="btn btn-grad w-80" onClick={clicked}>
        {window.txt.pop.wel.btn}
      </button>
    </div>
  );
};

const Lose = (props) => {
  const { pop, upd, slot } = props;
  const { welc, lose, win, ctr, bal } = pop;

  useEffect(() => {
    upd({
      ...pop,
      bal: bal - 50,
    });
  }, []);

  const clicked = async () => {
    slot.spin(ctr % 2 === 0 ? 0 : ctr > 1 ? 1 : 2); //1 is $250 2 is jackpot
    // spin(ctr);
    await hide();
    if (ctr % 2 === 0) {
      upd({
        ...pop,
        show: false,
        win: false,
        lose: true,
      });
    } else {
      upd({
        ...pop,
        show: false,
        win: true,
        lose: false,
      });
    }
    await drop(ctr % 2 != 0 ? true : false);
    upd({
      ...pop,
      show: true,
      ctr: ctr - 1,
    });
  };

  return (
    <div className="flx flx-col flx-jc-sp flx-ai-ce h-100">
      <h4 className="days txt-wht w-100 txt-al-ce">
        {window.txt.pop.lose.head}
      </h4>
      <img src={window.txt.pop.lose.img} alt="astro" className="w-50" />
      <h4 className="w-100 txt-al-ce txt-wht days">
        {window.txt.pop.lose.bold}
      </h4>
      <p className="w-100 txt-al-ce txt-wht mono">{window.txt.pop.lose.mes}</p>
      <button className="btn btn-trans w-80" onClick={clicked}>
        {window.txt.pop.lose.btn}
      </button>
    </div>
  );
};

const Win = (props) => {
  const { pop, upd, slot } = props;
  const { welc, lose, win, ctr, bal } = pop;

  useEffect(() => {
    if (ctr <= 1) {
      upd({
        ...pop,
        bal: 1000,
      });
    }
  }, []);

  const clicked = async () => {
    slot.spin(0);
    // spin(ctr);
    await hide();
    upd({
      ...pop,
      show: false,
      ctr: ctr - 1,
    });
    await drop();
    upd({
      ...pop,
      show: true,
      ctr: ctr - 1,
    });
  };

  return (
    <div className="flx flx-col flx-jc-sp flx-ai-ce h-100">
      <h2 className="days txt-wht w-100 txt-al-ce">
        {ctr === 2 ? window.txt.pop.win.cash : window.txt.pop.win.head}
      </h2>
      <img src={window.txt.pop.win.img} alt="astro" className="w-30" />
      <h4 className="w-100 txt-al-ce txt-wht days">
        {window.txt.pop.win.bold}
      </h4>
      <p className="w-100 txt-al-ce txt-wht mono">
        {ctr <= 1 ? window.txt.pop.win.mes2 : window.txt.pop.win.mes}
      </p>
      <button
        className="btn btn-grad w-80 product-button"
        data-product-id="1"
        onClick={
          ctr > 1
            ? clicked
            : (elem) => ActionRedirect(elem.target.dataset.productId)
        }
      >
        {ctr === 2 ? window.txt.pop.lose.btn : window.txt.pop.win.btn}
      </button>
    </div>
  );
};

export const Pop = (props) => {
  const { pop, upd, spin, mob, slot, set } = props;
  const { welc, lose, win, ctr } = pop;

  return (
    <div className="w-100 h-100 pos-abs z-top bg-pop flx flx-jc-ce flx-ai-ce fade pop">
      <div className="bg-cont flx flx-jc-ce flx-ai-ce w-30 p-20 h-80 fade-t z-front popCont">
        {welc ? (
          <Welcome
            pop={pop}
            upd={upd}
            spin={spin}
            mob={mob}
            set={mob ? set : undefined}
          />
        ) : find(check, ctr) ? (
          <Lose pop={pop} upd={upd} slot={slot} />
        ) : (
          <Win pop={pop} upd={upd} slot={slot} />
        )}
      </div>
    </div>
  );
};
