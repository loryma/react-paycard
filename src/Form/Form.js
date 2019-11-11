import React, { useState } from "react";
import FormContext from "./FormContext";
import Card from "./Card/Card";
import checkType from "./utilities/checkCardType";
import validate from "./utilities/validate";
import classes from "./Form.module.css";

const visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterCard = /^(?:5[1-5][0-9]{14})$/;
const americanExpress = /^(?:3[47][0-9]{13})$/;
const discovery = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

const Form = ({
  style = { fontFamily: "Verdana", margin: "0 auto", maxWidth: "460px" }
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
        regex: {
          visa,
          masterCard,
          americanExpress,
          discovery
        },
        minWidth: 13,
        maxWidth: 16
      },
      value: "",
      errors: false,
      valid: false
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
      value: "",
      errors: false,
      valid: false
    },
    expirationMonth: {
      config: {
        name: "expirationMonth"
      },
      validation: {
        requered: true
      },
      value: "",
      errors: false,
      valid: false
    },
    expirationYear: {
      config: {
        name: "expirationYear",
        type: "text"
      },
      validation: {
        requered: true
      },
      value: "",
      errors: false,
      valid: false
    },
    cvc: {
      config: {
        name: "cvc",
        type: "text"
      },
      validation: {
        requered: true,
        regex: /^[0-9]{3,4}$/
      },
      value: "",
      errors: false,
      valid: false
    }
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState("");

  const expieryMonthClasses = [classes.Input, classes.ExpieryMonth].join(" ");
  const expieryYearClasses = [classes.Input, classes.ExpieryYear].join(" ");
  const cvcClasses = [classes.Input, classes.CvcClasses].join(" ");

  const onFieldChange = (name, e) => {
    const value = e.target.value;
    const errors = validate(value, name, fields[name].validation);

    if (name === "cardNumber") {
      setCardType(checkType(value));
    }

    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        value,
        errors,
        valid: !errors
      }
    });
  };

  const onCvcFocus = () => {
    setIsFlipped(true);
  };

  const onCvcBlur = () => {
    setIsFlipped(false);
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
          isFlipped={isFlipped}
          cardType={cardType}
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
                onFocus={onCvcFocus}
                onBlur={onCvcBlur}
              />
            </div>
          </div>
          <button type="submit" className={classes.Submit}>
            Submit
          </button>
        </form>
      </div>
    </FormContext.Provider>
  );
};

export default Form;
