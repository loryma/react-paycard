import React, { useRef } from "react";
import CardNumber from "../CardNumber/CardNumber";
import HashNumber from "../HashNumber/HashNumber";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import "../Transitions.css";

const CardNumbers = ({ numbers }) => {
  const numArray = numbers.split("");
  const resultArray = numArray.map(
    (el, index) => (
      <CSSTransition
        key={numArray[index] + index}
        classNames="move-up"
        timeout={100}
      >
        <CardNumber number={numArray[index]} />
      </CSSTransition>
    )
    //   <CardNumber
    //     key={numArray[index] + index}
    //     number={numArray[index] || "#"}
    //   />
    // )
    // numArray[index] ? (
    //   <CardNumber key={numArray[index] + index} number={numArray[index]} />
    // ) : (
    //   <HashNumber />
    // )
  );
  return <TransitionGroup component={null}>{resultArray}</TransitionGroup>;
};

export default CardNumbers;
