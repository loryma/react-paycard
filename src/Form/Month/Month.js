import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import SwitchTransition from "react-transition-group/SwitchTransition";
import classes from "./Month.module.css";
import "../Transitions.css";

const Month = ({ month }) => {
  const monthArray = month.split("");

  const monthResult = monthArray.map((el, i) => (
    <CSSTransition key={el + i} classNames="fly-in" timeout={200}>
      <div className={classes.Char}>{el}</div>
    </CSSTransition>
  ));

  const monthContent = (
    <SwitchTransition>
      <CSSTransition key={!month} classNames="move-up" timeout={200}>
        <div className={classes.Content}>
          {month ? (
            <TransitionGroup component={null}>{monthResult}</TransitionGroup>
          ) : (
            <div className={classes.Placeholder}>MM</div>
          )}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );

  return monthContent;
};

export default Month;
