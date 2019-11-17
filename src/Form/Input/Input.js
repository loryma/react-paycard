import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  (
    { config, value, onChange, type, onFocus, onBlur, touched, errors },
    ref
  ) => {
    let field;
    const fieldClasses = [
      classes.Input,
      errors && touched ? classes.Invalid : ""
    ].join(" ");
    const error = errors && touched ? errors[0] : null;

    switch (type) {
      case "select":
        field = (
          <>
            <select
              ref={ref}
              className={fieldClasses}
              value={value}
              {...config}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option className={classes.Option} value="01">
                01
              </option>
              <option className={classes.Option} value="02">
                02
              </option>
              <option className={classes.Option} value="03">
                03
              </option>
              <option className={classes.Option} value="04">
                04
              </option>
              <option className={classes.Option} value="05">
                05
              </option>
              <option className={classes.Option} value="06">
                06
              </option>
              <option className={classes.Option} value="07">
                07
              </option>
              <option className={classes.Option} value="08">
                08
              </option>
              <option className={classes.Option} value="09">
                09
              </option>
              <option className={classes.Option} value="10">
                10
              </option>
              <option className={classes.Option} value="11">
                11
              </option>
              <option className={classes.Option} value="12">
                12
              </option>
            </select>

            {error ? <p className={classes.Error}>>{error}</p> : null}
          </>
        );
        break;
      default:
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
    }
    return field;
  }
);

export default Input;
