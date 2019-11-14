import React, { useState, useEffect } from "react";
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
  style = { fontFamily: "Verdana", margin: "0 auto", maxWidth: "460px" },
  onSubmit
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
      maskedValue: "",
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
        type: "number",
        placeholder: "Year"
      },
      validation: {
        requered: true,
        min: `${new Date().getFullYear()}`.substring(-2),
        max: `${new Date().getFullYear() + 10}`.substring(-2)
      },
      value: "",
      errors: false,
      valid: false
    },
    cardCvc: {
      config: {
        name: "cardCvc",
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
  const [focusedField, setFocusedField] = useState("");
  const [formIsValid, setFormIsValid] = useState();

  const expieryMonthClasses = [classes.Input, classes.ExpieryMonth].join(" ");
  const expieryYearClasses = [classes.Input, classes.ExpieryYear].join(" ");
  const cvcClasses = [classes.Input, classes.CvcClasses].join(" ");

  useEffect(() => {
    const formValidity = Object.values(fields).reduce(
      (acc, el) => acc && el.validation.valid,
      true
    );

    setFormIsValid(formValidity);
  }, [fields]);

  const onFieldChange = (name, e) => {
    let value = e.target.value;
    let errors;
    let maskedValue;

    if (name === "expirationYear") {
      value = value.substring(0, 2);
    }

    if (name === "cardNumber") {
      let unmaskedValue = value.replace(/\D+/g, "").substring(0, 16);
      const oldMaskedValue = fields.cardNumber.maskedValue;
      //check if used is editing the card number
      if (oldMaskedValue.slice(0, -1) === value) {
        maskedValue = value;
      } else {
        maskedValue = unmaskedValue
          .replace(/(\d{4})/g, "$1 ")
          .replace(/(\d{4}) (\d{4}) (\d{4}) (\d{4}) /, "$1 $2 $3 $4");
      }

      setCardType(checkType(unmaskedValue));

      errors = validate(unmaskedValue, name, fields[name].validation);

      setFields({
        ...fields,
        cardNumber: {
          ...fields.cardNumber,
          value: unmaskedValue,
          maskedValue,
          errors,
          valid: !errors
        }
      });
    } else {
      errors = validate(value, name, fields[name].validation);

      setFields({
        ...fields,
        [name]: {
          ...fields[name],
          value,
          errors,
          valid: !errors
        }
      });
    }
  };

  const onFocus = name => {
    setFocusedField(name);
    if (name === "cardCvc") {
      setIsFlipped(true);
    }
  };

  const onBlur = name => {
    if (name === "cardCvc") {
      setIsFlipped(false);
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (formIsValid) {
      let formData = {};
      for (let key in fields) {
        formData[key] = fields[key].value;
      }
      onSubmit(formData);
    }
  };

  return (
    <FormContext.Provider value={{ data: fields }}>
      <div className={classes.FormWrapper} style={style}>
        <Card
          cardNumber={fields.cardNumber.maskedValue}
          cardHolder={fields.cardHolder.value}
          expirationMonth={fields.expirationMonth.value}
          expirationYear={fields.expirationYear.value}
          cardCvc={fields.cardCvc.value}
          isFlipped={isFlipped}
          cardType={cardType}
          focusedField={focusedField}
        />
        <form onSubmit={onFormSubmit} className={classes.Form} noValidate>
          <div className={classes.Row}>
            <label className={classes.Label} htmlFor="cardNumber">
              Card Number
            </label>
            <input
              className={classes.Input}
              id="cardNumber"
              type="text"
              {...fields.cardNumber.config}
              value={fields.cardNumber.maskedValue}
              onChange={onFieldChange.bind(this, fields.cardNumber.config.name)}
              onFocus={onFocus.bind(this, "CardNumber")}
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
              onFocus={onFocus.bind(this, "CardHolder")}
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
                  onFocus={onFocus.bind(this, "Expiration")}
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
                  {...fields.expirationYear.config}
                  value={fields.expirationYear.value}
                  onChange={onFieldChange.bind(
                    this,
                    fields.expirationYear.config.name
                  )}
                  onFocus={onFocus.bind(this, "Expiration")}
                />
              </div>
            </div>
            <div className={classes.RowCvc}>
              <label className={classes.Label}>Cvc</label>
              <input
                className={cvcClasses}
                type="text"
                {...fields.cardCvc.config}
                onChange={onFieldChange.bind(this, fields.cardCvc.config.name)}
                onFocus={onFocus.bind(this, "cardCvc")}
                onBlur={onBlur.bind(this, "cardCvc")}
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
