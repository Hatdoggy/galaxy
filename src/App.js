import { Stars } from "./components/bg.js";
import { Main } from "./components/Main";
import { Pop } from "./components/pop";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function App() {
  const mobile = useMediaQuery({
    query: "(max-width: 680px)",
  });
  const [size, setSize] = useState(window.innerWidth);
  const [anim, setAnim] = useState(false);
  const [spin, showSpin] = useState(false);
  const [slot, setSlot] = useState(undefined);
  let ndx = window.txt.spins.val;
  let bal = window.txt.bal.val;

  const [pop, updPop] = useState({
    show: false,
    welc: true,
    lose: false,
    win: false,
    ctr: ndx,
    bal: bal,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize(window.innerWidth);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
    }, 500);

    setTimeout(() => {
      updPop({
        ...pop,
        show: true,
      });
    }, 2000);
  }, []);

  return (
    <div className="App h-100 w-100 pos-rel">
      <Stars />
      {pop.show && (
        <Pop
          pop={pop}
          upd={updPop}
          spin={showSpin}
          mob={mobile}
          slot={slot}
          set={setSlot}
        />
      )}
      {anim && (
        <Main
          pop={pop}
          upd={updPop}
          mobile={mobile}
          spin={spin}
          slot={slot}
          size={size}
          set={setSlot}
        />
      )}
    </div>
  );
}

export default App;
