import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  ({ config, value, onChange, onFocus, onBlur, touched, errors }, ref) => {
    let field;

    const fieldClasses = [
      classes.Input,
      errors && touched ? classes.Invalid : ""
    ].join(" ");

    const error = errors && touched ? errors[0] : null;
    field = (
      <>
        <input
          ref={ref}
          className={fieldClasses}
          value={value}
          {...config}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {error ? <p className={classes.Error}>{error}</p> : null}
      </>
    );
    return field;
  }
);

export default Input;
