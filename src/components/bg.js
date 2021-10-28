const Stars = () => {
  return (
    <div className="h-100 w-100 pos-abs z-neg">
      <img src="./img/planet1.svg" alt="planet1" className="planet planet-m" />
      <img src="./img/planet2.svg" alt="planet2" className="planet planet-b" />
      <img src="./img/planet3.svg" alt="planet3" className="planet planet-t" />

      <img src="./img/comet1.svg" alt="comet1" className="comet comet-tm" />
      <img src="./img/comet2.svg" alt="comet2" className="comet comet-b" />
      <img src="./img/comet3.svg" alt="comet3" className="comet comet-mr" />
      <img src="./img/comet4.svg" alt="comet1" className="comet comet-t" />
      <img src="./img/comet5.svg" alt="comet2" className="comet comet-bm" />
      <img src="./img/comet6.svg" alt="comet3" className="comet comet-ml" />
    </div>
  );
};

export { Stars };
