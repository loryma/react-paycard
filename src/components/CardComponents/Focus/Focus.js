import React from "react";
import classes from "./Focus.module.css";

const Focus = ({ focusedField, style }) => {
  const FocusClasses = [classes.Focus, classes[`Focus-${focusedField}`]].join(
    " "
  );
  return <div style={style} className={FocusClasses}></div>;
};

export default Focus;
