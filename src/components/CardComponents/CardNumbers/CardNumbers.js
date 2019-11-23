import React from "react";
import CardNumber from "../CardNumber/CardNumber";
import SwitchTransition from "react-transition-group/SwitchTransition";
import CSSTransition from "react-transition-group/CSSTransition";
import "../../Transitions.css";

const CardNumbers = ({ numbers }) => {
  const arr = [...new Array(19)].map((_, i) =>
    numbers[i] ? numbers[i] : (i + 1) % 5 ? "#" : " "
  );

  const resultArray = arr.map((el, i) => (
    <SwitchTransition>
      <CSSTransition key={el + i} classNames="move-up" timeout={200}>
        <CardNumber number={el} />
      </CSSTransition>
    </SwitchTransition>
  ));
  return resultArray;
};

export default CardNumbers;
