import { Greet, How, Stats, Terms } from "./Texts";
import spin, { drop } from "../func";
import { Spinner } from "./svg";
import { init } from "../func";
import { useEffect, useState } from "react";
import Slot, { Spins } from "./slot";

const config = {
  inverted: true, // true: reels spin from top to bottom; false: reels spin from bottom to top
};

const Left = (props) => {
  const { spins, bal, mob, slot, spin, pop, upd, size, set } = props;
  const { welc, lose, win, ctr, show } = pop;

  const click = async () => {
    let headBtn = document.querySelector(".headBtn");
    headBtn.style.animation = "";
    await drop();
    upd({
      ...pop,
      show: true,
      ctr: ctr - 1,
    });
  };

  return (
    <section className="w-50 h-100 flx flx-col flx-jc-sp flx-ai-ce p-20 fade-l left">
      <h4 className="days txt-wht w-100">{window.txt.title}</h4>
      <Greet />
      <How />
      {!mob && <Stats spins={spins} bal={bal} />}
      {!mob && (
        <button
          className="btn btn-grad w-30 cursor trans spinBtn"
          onClick={click}
        >
          {window.txt.btn}
        </button>
      )}
      {!mob && <Terms />}
    </section>
  );
};

const Svg = (props) => {
  const { pop, upd, spin, size, set } = props;

  const { spins, bal, mob } = props;
  const { welc, lose, win, ctr, show } = pop;

  useEffect(() => {
    init();
    let btn = document.querySelector("button.spinBtn");
    btn.classList.add("pulse", "m-t-2");
  }, []);

  const click = async () => {
    let headBtn = document.querySelector(".headBtn");
    headBtn.style.animation = "";

    let btn = document.querySelector("button.spinBtn");
    btn.classList.remove("pulse");
    await drop();
    upd({
      ...pop,
      show: true,
      ctr: ctr - 1,
    });
  };

  return (
    <section
      className={`w-50 flx flx-ai-ce fade-r ${
        !mob ? " flx-jc-ce" : "flx-col  flx-jc-ce ovr-hide"
      }`}
    >
      {mob && <h4 className="days txt-wht w-100 title">{window.txt.title}</h4>}

      <div className="w-100 h-100 pos-rel flx flx-col flx-jc-ce flx-ai-ce spinDiv">
        <Spinner pop={pop} upd={upd} size={size} set={set} />
        <Spins pop={pop} mob={mob} spin={spin} />
      </div>
      {mob && <Stats spins={spins} bal={bal} />}
      {mob && (
        <button
          className="btn btn-grad w-30 cursor trans spinBtn m-t-2"
          onClick={click}
        >
          {window.txt.btn}
        </button>
      )}
      {mob && <Terms />}
    </section>
  );
};

const Main = (props) => {
  const { pop, upd, mobile, spin, slot, size, set } = props;
  const { ctr, bal } = pop;

  return mobile ? (
    <main className="w-100 h-100 flx">
      {spin ? (
        <Svg
          pop={pop}
          upd={upd}
          mob={mobile}
          show={spin}
          spins={ctr}
          bal={bal}
          spin={spin}
          siz={size}
          set={set}
        />
      ) : (
        <Left
          pop={pop}
          upd={upd}
          spins={ctr}
          bal={bal}
          mob={mobile}
          show={spin}
          slot={slot}
          spin={spin}
        />
      )}
    </main>
  ) : (
    <main className="w-100 h-100 flx">
      <Left spins={ctr} bal={bal} slot={slot} pop={pop} upd={upd} />
      <Svg pop={pop} upd={upd} mob={mobile} size={size} set={set} />
    </main>
  );
};

export { Main };
