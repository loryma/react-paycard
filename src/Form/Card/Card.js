import React from "react";
import classes from "./Card.module.css";
const Card = ({
  cardNumber,
  cardHolder = "AD SOYAD",
  expirationMonth,
  expirationYear,
  cvc
}) => {
  return (
    <div className={classes.Card}>
      <div className={classes.Forward}>
        <div className={classes.TopRow}>
          <div className={classes.Rectangle}></div>
          <div className={classes.Logo}></div>
        </div>
        <div className={classes.CardNumber}>{cardNumber}</div>
        <div className={classes.BottomRow}>
          <div>
            <label>Card Holder</label>
            <div>{cardHolder}</div>
          </div>

          <div className={classes.Expiraton}>
            <label>Expiraton</label>
            <div>
              <span>{expirationMonth}</span>/<span>{expirationYear}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Backward}>
        <div>{cvc}</div>
      </div>
    </div>
  );
};

export default Card;
