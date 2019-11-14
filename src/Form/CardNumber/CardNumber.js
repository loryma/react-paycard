import React from "react";
import classes from "./CardNumber.module.css";

const CardNumber = ({ number, active }) => {
  return (
    <div className={classes.CardNumber}>
      <div className={classes.Number}>{number}</div>
    </div>
  );
};

export default CardNumber;
