import React, { useRef, useState, useEffect } from "react";
import classes from "./Card.module.css";
import chip from "./chip.png";
import Logo from "../Logo/Logo";
import CardNumbers from "../CardNumbers/CardNumbers";
import CardHolder from "../CardHolder/CardHolder";
import Month from "../Month/Month";
import Year from "../Year/Year";
import Focus from "../Focus/Focus";
import img from "./card_5.jpg";

// import img from [...new Array(5)].map((_, i) => `./card_${i + 1}.jpg`)[
//   Math.round(Math.random() * 5)
// ];

const useForceUpdate = () => {
  let [value, setValue] = useState(0);

  return () => setValue(++value);
};

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Card = ({
  cardNumber,
  cardHolder,
  expiration,
  cardCvc,
  isFlipped,
  cardType,
  focusedField,
  focusField
}) => {
  const forceUpdate = useForceUpdate();
  const WrapperClasses = [
    classes.Wrapper,
    isFlipped ? classes.IsFlipped : ""
  ].join(" ");
  const refs = {
    cardNumber: useRef(null),
    cardHolder: useRef(null),
    expiration: useRef(null)
  };

  const calcFocusPos = focusStyle => {
    return {
      width: focusedField
        ? refs[focusedField].current.offsetWidth + "px"
        : "100%",
      height: focusedField
        ? refs[focusedField].current.offsetHeight + "px"
        : "100%",
      left: focusedField ? refs[focusedField].current.offsetLeft + "px" : "0",
      top: focusedField ? refs[focusedField].current.offsetTop + "px" : "0"
    };
  };
  let focusStyle = calcFocusPos(focusField);

  const onClick = name => {
    focusField(name);
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(function() {
      forceUpdate();
    }, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [forceUpdate]);

  const expirationMonth = expiration.slice(0, 2) || "";
  const expirationYear = expiration.split("/")[1] || "";

  const style = { backgroundImage: `url(${img})` };

  return (
    <div className={classes.Card}>
      <div className={WrapperClasses}>
        <div style={style} className={classes.Forward}>
          <Focus style={focusStyle} focusedField={focusedField} />
          <img src={chip} alt="card chip" className={classes.Chip} />

          <div className={classes.Logo}>
            <Logo cardType={cardType} />
          </div>
          <div
            onClick={onClick.bind(this, "cardNumber")}
            ref={refs.cardNumber}
            className={classes.CardNumber}
          >
            <CardNumbers numbers={cardNumber} />
          </div>
          <div
            onClick={onClick.bind(this, "cardHolder")}
            className={classes.CardHolder}
            ref={refs.cardHolder}
          >
            <label className={classes.Label}>Card Holder</label>
            <div className={classes.CardHolderName}>
              <CardHolder name={cardHolder} />
            </div>
          </div>

          <div ref={refs.expiration} className={classes.Expiration}>
            <label className={classes.Label}>Expires</label>
            <div className={classes.ExpirationWrapper}>
              <span
                onClick={onClick.bind(this, "expiration")}
                className={classes.ExpirationMonth}
              >
                <Month month={expirationMonth} />
              </span>
              /
              <span
                onClick={onClick.bind(this, "expiration")}
                className={classes.ExpirationYear}
              >
                <Year ref={refs.ExpirationYear} year={expirationYear} />
              </span>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${img})` }}
          className={classes.Backward}
        >
          <div className={classes.Cvc}>{cardCvc}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
