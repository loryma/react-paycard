import React from "react";
import classes from "./Card.module.css";
import chip from "./chip.png";
import Logo from "../Logo/Logo";
import CardNumbers from "../CardNumbers/CardNumbers";

const Card = ({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  cardCvc,
  isFlipped,
  cardType,
  focusedField
}) => {
  const WrapperClasses = [
    classes.Wrapper,
    isFlipped ? classes.IsFlipped : ""
  ].join(" ");
  const FocusClasses = [classes.Focus, classes[`Focus-${focusedField}`]].join(
    " "
  );

  return (
    <div className={classes.Card}>
      <div className={WrapperClasses}>
        <div className={classes.Forward}>
          <div className={FocusClasses}></div>
          <div className={classes.TopRow}>
            <img src={chip} alt="card chip" className={classes.Chip} />

            <Logo cardType={cardType} />
          </div>
          <div className={classes.CardNumber}>
            <CardNumbers numbers={cardNumber} />
          </div>
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
          <div className={classes.Cvc}>{cardCvc}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
