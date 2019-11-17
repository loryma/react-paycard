import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import SwitchTransition from "react-transition-group/SwitchTransition";
import classes from "./Month.module.css";
import "../Transitions.css";

const Month = ({ month }) => {
  return (
    <SwitchTransition>
      <CSSTransition key={month} classNames="move-up" timeout={200}>
        <div className={classes.Content}>{month}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Month;
