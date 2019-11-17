import React from "react";
import classes from "./Card.module.css";
import chip from "./chip.png";
import Logo from "../Logo/Logo";
import CardNumbers from "../CardNumbers/CardNumbers";
import CardHolder from "../CardHolder/CardHolder";
import Month from "../Month/Month";
import Year from "../Year/Year";
import Focus from "../Focus/Focus";
import img from "../../card.jpg";

const Card = ({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  cardCvc,
  isFlipped,
  cardType,
  focusedField,
  focusField
}) => {
  const WrapperClasses = [
    classes.Wrapper,
    isFlipped ? classes.IsFlipped : ""
  ].join(" ");

  const onClick = name => {
    focusField(name);
  };

  const style = { backgroundImage: `url(${img})` };

  return (
    <div className={classes.Card}>
      <div className={WrapperClasses}>
        <div style={style} className={classes.Forward}>
          <Focus focusedField={focusedField} />
          <img src={chip} alt="card chip" className={classes.Chip} />

          <div className={classes.Logo}>
            <Logo cardType={cardType} />
          </div>
          <div
            onClick={onClick.bind(this, "cardNumber")}
            className={classes.CardNumber}
          >
            <CardNumbers numbers={cardNumber} />
          </div>
          <div
            onClick={onClick.bind(this, "cardHolder")}
            className={classes.CardHolder}
          >
            <label className={classes.Label}>Card Holder</label>
            <div className={classes.CardHolderName}>
              <CardHolder name={cardHolder} />
            </div>
          </div>

          <div onClick={e => alert(e)} className={classes.Expiration}>
            <label className={classes.Label}>Expires</label>
            <div className={classes.ExpirationWrapper}>
              <span
                onClick={onClick.bind(this, "expirationMonth")}
                className={classes.ExpirationMonth}
              >
                <Month month={expirationMonth} />
              </span>
              /
              <span
                onClick={onClick.bind(this, "expirationYear")}
                className={classes.ExpirationYear}
              >
                <Year year={expirationYear} />
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
