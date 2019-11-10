import React from "react";
import classes from "./Card.module.css";
const Card = ({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  cvc,
  isFlipped
}) => {
  const WrapperClasses = [
    classes.Wrapper,
    isFlipped ? classes.IsFlipped : ""
  ].join(" ");
  return (
    <div className={classes.Card}>
      <div className={WrapperClasses}>
        <div className={classes.Forward}>
          <div className={classes.TopRow}>
            <div className={classes.Rectangle}></div>
            <div className={classes.Logo}></div>
          </div>
          <div className={classes.CardNumber}>{cardNumber}</div>
          <div className={classes.BottomRow}>
            <div className={classes.CardHolder}>
              <label className={classes.Label}>Card Holder</label>
              <div className={classes.CardHolderName}>
                {cardHolder || "AD SOYAD"}
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
