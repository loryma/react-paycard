import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import SwitchTransition from "react-transition-group/SwitchTransition";
import classes from "./CardHolder.module.css";
import "../Transitions.css";

const CardHolder = ({ name }) => {
  const nameArray = name.split("");

  const nameResult = nameArray.map((el, i) => (
    <CSSTransition key={el + i} classNames="fly-in" timeout={200}>
      <div className={classes.Char}>
        {el === " " ? <span>&nbsp;</span> : el}
      </div>
    </CSSTransition>
  ));

  const nameContent = (
    <SwitchTransition>
      <CSSTransition key={!name} classNames="move-up" timeout={200}>
        <div className={classes.Content}>
          {name ? (
            <TransitionGroup>{nameResult}</TransitionGroup>
          ) : (
            <div className={classes.Placeholder}>FULL NAME</div>
          )}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );

  return nameContent;
};

export default CardHolder;
