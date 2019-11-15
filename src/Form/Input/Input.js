import React from "react";
import classes from "./Input.module.css";

const Input = ({
  config,
  value,
  onChange,
  type,
  onFocus,
  onBlur,
  className,
  errors
}) => {
  let field;
  const fieldClasses = [classes.Input, errors ? classes.Invalid : ""].join(" ");

  switch (type) {
    case "select":
      field = (
        <select
          className={fieldClasses}
          value={value}
          {...config}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <option className={classes.Option} value="">
            Month
          </option>
          <option className={classes.Option} value="01">
            Jan
          </option>
          <option className={classes.Option} value="02">
            Feb
          </option>
          <option className={classes.Option} value="03">
            Mar
          </option>
          <option className={classes.Option} value="04">
            Apr
          </option>
          <option className={classes.Option} value="05">
            May
          </option>
          <option className={classes.Option} value="06">
            Jun
          </option>
          <option className={classes.Option} value="07">
            Jul
          </option>
          <option className={classes.Option} value="08">
            Aug
          </option>
          <option className={classes.Option} value="09">
            Sep
          </option>
          <option className={classes.Option} value="10">
            Oct
          </option>
          <option className={classes.Option} value="11">
            Nov
          </option>
          <option className={classes.Option} value="12">
            Dec
          </option>
        </select>
      );
      break;
    default:
      field = (
        <input
          className={fieldClasses}
          value={value}
          {...config}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      );
  }
  return field;
};

export default Input;
