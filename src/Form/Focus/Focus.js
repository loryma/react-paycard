import React from "react";
import classes from "./Focus.module.css";

const Focus = ({ focusedField }) => {
  const FocusClasses = [classes.Focus, classes[`Focus-${focusedField}`]].join(
    " "
  );
  return <div className={FocusClasses}></div>;
};

export default Focus;
