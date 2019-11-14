import React from "react";
import SwitchTransition from "react-transition-group/SwitchTransition";
import CSSTransition from "react-transition-group/CSSTransition";
import classes from "./Logo.module.css";
import visa from "./visa.png";
import mastercard from "./mastercard.png";
import discover from "./discover.png";
import americanExpress from "./americanexpress.png";
import "../Transitions.css";

const Logo = ({ cardType }) => {
  let cardLogo = visa;

  if (cardType) {
    if (cardType === "masterCard") {
      cardLogo = mastercard;
    } else if (cardType === "discover") {
      cardLogo = discover;
    } else if (cardType === "americanExpress") {
      cardLogo = americanExpress;
    }
    console.log(cardType, cardLogo);
  }
  return (
    <div className={classes.Wrapper}>
      <SwitchTransition in-out>
        <CSSTransition key={cardType} classNames="move-up" timeout={100}>
          <img
            src={cardLogo}
            key={cardType}
            alt="card logo"
            className={classes.Logo}
          />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Logo;
