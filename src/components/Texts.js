const Greet = () => {
  return (
    <div className="w-80 flx flx-col flx-jc-ce flx-ai-ce bg-trans p-20 flx flx-jc-ce fade-l grt">
      <h4 className="days txt-wht w-100">{window.txt.greet.head}</h4>
      <p className="mono txt-wht m-t-2">{window.txt.greet.mes}</p>
    </div>
  );
};

const How = () => {
  return (
    <div className="w-80 flx flx-jc-ce flx-ai-ce bg-trans p-20 flx flx-jc-ce fade-l how">
      <div className="w-100 flx flx-col flx-jc-ce flx-ai-ce">
        <h4 className="days txt-wht w-100">{window.txt.how.head}</h4>
        <p className="mono txt-wht m-t-2">
          {window.txt.how.mes1}
          <span className=" days">{window.txt.how.color}</span>
          {window.txt.how.mes2}
        </p>
      </div>
    </div>
  );
};

const Stats = (props) => {
  const { spins, bal } = props;
  return (
    <div className="flx flx-jc-ce flx-ai-ce w-80 fade-l stat">
      <div className="bg-trans p-20 flx w-30 m-r-1">
        <p className="days txt-wht">{window.txt.spins.txt}</p>
        <p className="days txt-wht m-l-auto">{spins}</p>
      </div>
      <div className="bg-trans p-20 flx m-l-auto w-30 m-l-2">
        <p className="days txt-wht">{window.txt.bal.txt}</p>
        <p className="days txt-wht m-l-auto">${bal}</p>
      </div>
    </div>
  );
};

const Terms = () => {
  return (
    <div className="flx flx-col flx-jc-ce flx-ai-ce w-80 fade-l termsTxt">
      <p className="txt-wht days w-100">{window.txt.terms.head}</p>
      <small className="txt-wht mono">{window.txt.terms.mes}</small>
    </div>
  );
};

export { Greet, How, Stats, Terms };
