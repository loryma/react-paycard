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
    width: "90%",
    boxShadow: "10px 10px 10px #ddeefc"
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
      valid: false,
      edited: false,
      touched: false
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
      valid: false,
      edited: false,
      touched: false
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
      valid: false,
      edited: false,
      touched: false
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
        min: `${new Date().getFullYear()}`.slice(-2),
        max: `${new Date().getFullYear() + 10}`.slice(-2)
      },
      value: "",
      errors: false,
      valid: false,
      edited: false,
      touched: false
    },
    cardCvc: {
      type: "input",
      config: {
        name: "cardCvc",
        type: "number"
      },
      validation: {
        requered: true,
        regex: /^[0-9]{3,4}$/,
        minWidth: 3,
        maxWidth: 4
      },
      value: "",
      errors: false,
      valid: false,
      edited: false,
      touched: false
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

      setFields(state => ({
        ...state,
        [name]: {
          ...state[name],
          value,
          errors,
          valid: !errors,
          edited: true
        }
      }));
    }
  };

  const onCardNumberFieldChange = (name, value) => {
    let maskedValue;
    let unmaskedValue = value.replace(/\D+/g, "").substring(0, 16);
    const oldMaskedValue = fields.cardNumber.maskedValue;
    //check if used is editing the card number
    if (oldMaskedValue.slice(0, -1) === value || unmaskedValue === value) {
      maskedValue = value;
    } else {
      maskedValue = unmaskedValue
        .replace(/(\d{4})/g, "$1 ")
        .replace(/(\d{4}) (\d{4}) (\d{4}) (\d{4}) /, "$1 $2 $3 $4");
    }

    setCardType(checkType(unmaskedValue));

    let errors = validate(unmaskedValue, name, fields[name].validation);

    setFields(state => ({
      ...state,
      cardNumber: {
        ...state.cardNumber,
        value: unmaskedValue,
        maskedValue,
        errors: errors,
        valid: !errors,
        edited: true
      }
    }));

    console.log(errors, fields.cardNumber);
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
    if (!fields[name].touched && fields[name].edited) {
      fields[name].touched = true;
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
    } else {
      for (let key in fields) {
        onFieldChange(key, { target: { value: fields[key].value } });
        setFields(state => ({
          ...state,
          [key]: { ...state[key], touched: true }
        }));
      }
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
        touched={fields[key].touched}
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
                <div className={classes.ExpieryMonth}>
                  {inputs.expirationMonth}
                </div>

                <div className={classes.ExpieryYear}>
                  {inputs.expirationYear}
                </div>
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
