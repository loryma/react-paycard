import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import SwitchTransition from "react-transition-group/SwitchTransition";
import classes from "./Year.module.css";
import "../Transitions.css";

const Year = ({ year }) => {
  const yearArray = year.split("");

  const yearResult = yearArray.map((el, i) => (
    <CSSTransition key={el + i} classNames="fly-in" timeout={200}>
      <div className={classes.Char}>{el}</div>
    </CSSTransition>
  ));

  const yearContent = (
    <SwitchTransition>
      <CSSTransition key={!year} classNames="move-up" timeout={200}>
        <div className={classes.Content}>
          {year ? (
            <TransitionGroup>{yearResult}</TransitionGroup>
          ) : (
            <div className={classes.Placeholder}>YY</div>
          )}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );

  return yearContent;
};

export default Year;
