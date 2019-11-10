import React, { useState } from "react";
import FormContext from "./FormContext";
import Card from "./Card/Card";
import classes from "./Form.module.css";

const Form = ({
  style = { fontFamily: "Open Sans", margin: "0 auto", maxWidth: "460px" }
}) => {
  const [fields, setFields] = useState({
    cardNumber: {
      config: {
        name: "cardNumber",
        type: "text",
        placeholder: ""
      },
      validation: {
        requered: true,
        regX: /^[0-9]{16}$/,
        minWidth: 16,
        maxWidth: 16
      },
      value: ""
    },
    cardHolder: {
      config: {
        name: "cardHolder",
        type: "text",
        placeholder: ""
      },
      validation: {
        requered: true
      },
      value: ""
    },
    expirationMonth: {
      config: {
        name: "expirationMonth"
      },
      validation: {
        requered: true
      },
      value: ""
    },
    expirationYear: {
      config: {
        name: "expirationYear",
        type: "text"
      },
      validation: {
        requered: true
      },
      value: ""
    },
    cvc: {
      config: {
        name: "cvc",
        type: "text"
      },
      validation: {
        requered: true
      },
      value: ""
    }
  });

  const expieryMonthClasses = [classes.Input, classes.ExpieryMonth].join(" ");
  const expieryYearClasses = [classes.Input, classes.ExpieryYear].join(" ");
  const cvcClasses = [classes.Input, classes.CvcClasses].join(" ");

  const onFieldChange = (name, e) => {
    setFields({
      ...fields,
      [name]: { ...fields[name], value: e.target.value }
    });
  };
  return (
    <FormContext.Provider value={{ data: fields }}>
      <div className={classes.FormWrapper} style={style}>
        <Card
          cardNumber={fields.cardNumber.value}
          cardHolder={fields.cardHolder.value}
          expirationMonth={fields.expirationMonth.value}
          expirationYear={fields.expirationYear.value}
          cvc={fields.cvc.value}
        />
        <form className={classes.Form} noValidate>
          <div className={classes.Row}>
            <label className={classes.Label} htmlFor="cardNumber">
              Card Number
            </label>
            <input
              className={classes.Input}
              id="cardNumber"
              type="text"
              {...fields.cardNumber.config}
              value={fields.cardNumber.value}
              onChange={onFieldChange.bind(this, fields.cardNumber.config.name)}
            />
          </div>
          <div className={classes.Row}>
            <label className={classes.Label} htmlFor="cardHolder">
              Card Holder
            </label>
            <input
              className={classes.Input}
              id="cardHolder"
              type="text"
              {...fields.cardHolder.config}
              value={fields.cardHolder.value}
              onChange={onFieldChange.bind(this, fields.cardHolder.config.name)}
            />
          </div>
          <div className={classes.RowExpieryCvc}>
            <div className={classes.RowExpiery}>
              <label className={classes.Label}>Expiration Date</label>
              <div className={classes.RowExpieryFields}>
                <select
                  className={expieryMonthClasses}
                  value={fields.expirationMonth.value}
                  {...fields.expirationMonth.config}
                  onChange={onFieldChange.bind(
                    this,
                    fields.expirationMonth.config.name
                  )}
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
                <input
                  className={expieryYearClasses}
                  type="date"
                  {...fields.expirationYear.config}
                  value={fields.expirationYear.value}
                  onChange={onFieldChange.bind(
                    this,
                    fields.expirationYear.config.name
                  )}
                />
              </div>
            </div>
            <div className={classes.RowCvc}>
              <label className={classes.Label}>Cvc</label>
              <input
                className={cvcClasses}
                type="text"
                {...fields.cvc.config}
                onChange={onFieldChange.bind(this, fields.cvc.config.name)}
              />
            </div>
          </div>
          <button type="submit" className={classes.Sumbit}>
            Submit
          </button>
        </form>
      </div>
    </FormContext.Provider>
  );
};

export default Form;
