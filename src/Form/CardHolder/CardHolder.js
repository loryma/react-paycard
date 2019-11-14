import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import classes from "./CardHolder.module.css";
import "../Transitions.css";

const CardHolder = ({ name }) => {
  const nameArray = name.split("");

  const nameResult = nameArray.map((el, i) => (
    <CSSTransition key={el + i} classNames="fly-in" timeout={200}>
      <span className={classes.Char}>{el}</span>
    </CSSTransition>
  ));
  return <TransitionGroup>{nameResult}</TransitionGroup>;
};

export default CardHolder;
