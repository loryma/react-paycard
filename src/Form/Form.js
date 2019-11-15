import React, { useState, useEffect } from "react";
import FormContext from "./FormContext";
import Card from "./Card/Card";
import Input from "./Input/Input";
import checkType from "./utilities/checkCardType";
import validate from "./utilities/validate";
import classes from "./Form.module.css";

const visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterCard = /^(?:5[1-5][0-9]{14})$/;
const americanExpress = /^(?:3[47][0-9]{13})$/;
const discovery = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

const Form = ({
  style = {
    fontFamily: "Verdana",
    margin: "auto",
    maxWidth: "570px",
    width: "90%"
  },
  onSubmit
}) => {
  const [fields, setFields] = useState({
    cardNumber: {
      type: "input",
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
      type: "input",
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
      type: "select",
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
      type: "input",
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
      type: "input",
      config: {
        name: "cardCvc",
        type: "number"
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
  let inputs = {};

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

    if (name === "expirationYear") {
      value = value.substring(0, 2);
    }

    if (name === "cardCvc") {
      value = value.replace(/\D+/g, "").substring(0, 4);
    }

    if (name === "cardNumber") {
      onCardNumberFieldChange(name, value);
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

  const onCardNumberFieldChange = (name, value) => {
    let maskedValue;
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

    const errors = validate(unmaskedValue, name, fields[name].validation);

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

  for (const key in fields) {
    const value = fields[key].maskedValue || fields[key].value;
    inputs[key] = (
      <Input
        type={fields[key].type}
        config={fields[key].config}
        value={value}
        onChange={onFieldChange.bind(this, fields[key].config.name)}
        onFocus={onFocus.bind(this, fields[key].config.name)}
        onBlur={onBlur.bind(this, fields[key].config.name)}
        errors={fields[key].errors}
      />
    );
  }

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
            <label className={classes.Label}>Card Number</label>
            {inputs.cardNumber}
          </div>
          <div className={classes.Row}>
            <label className={classes.Label}>Card Holder</label>
            {inputs.cardHolder}
          </div>
          <div className={classes.RowExpieryCvc}>
            <div className={classes.RowExpiery}>
              <label className={classes.Label}>Expiration Date</label>
              <div className={classes.RowExpieryFields}>
                {inputs.expirationMonth}
                {inputs.expirationYear}
              </div>
            </div>
            <div className={classes.RowCvc}>
              <label className={classes.Label}>Cvc</label>
              {inputs.cardCvc}
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
