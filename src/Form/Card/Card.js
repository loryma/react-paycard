import React from "react";
import classes from "./Card.module.css";
import visa from "./visa.png";
import mastercard from "./mastercard.png";
import discover from "./discover.png";
import americanExpress from "./americanexpress.png";
import chip from "./chip.png";

const Card = ({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  cvc,
  isFlipped,
  cardType,
  focusedField
}) => {
  let cardLogo = visa;
  if (cardType) {
    if (cardType === "masterCard") {
      cardLogo = mastercard;
    } else if (cardType === "discover") {
      cardLogo = discover;
    } else if (cardType === "americanExpress") {
      cardLogo = americanExpress;
    }
  }
  const WrapperClasses = [
    classes.Wrapper,
    isFlipped ? classes.IsFlipped : ""
  ].join(" ");
  const FocusClasses = [classes.Focus, classes[`Focus-${focusedField}`]].join(
    " "
  );
  console.log(focusedField);
  return (
    <div className={classes.Card}>
      <div className={WrapperClasses}>
        <div className={classes.Forward}>
          <div className={FocusClasses}></div>
          <div className={classes.TopRow}>
            <img src={chip} alt="card chip" className={classes.Chip} />
            <img src={cardLogo} alt="card logo" className={classes.Logo} />
          </div>
          <div className={classes.CardNumber}>{cardNumber}</div>
          <div className={classes.BottomRow}>
            <div className={classes.CardHolder}>
              <label className={classes.Label}>Card Holder</label>
              <div className={classes.CardHolderName}>
                {cardHolder || "FULL NAME"}
              </div>
            </div>

            <div className={classes.Expiration}>
              <label className={classes.Label}>Expires</label>
              <div className={classes.ExpirationWrapper}>
                <span className={classes.ExpirationMonth}>
                  {expirationMonth || "MM"}
                </span>
                /
                <span className={classes.ExpirationYear}>
                  {expirationYear || "YY"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.Backward}>
          <div className={classes.Cvc}>{cvc}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
