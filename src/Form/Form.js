import React, { useState, useEffect, useRef } from "react";
import Card from "./Card/Card";
import Input from "./Input/Input";
import checkType from "./utilities/checkCardType";
import validate from "./utilities/validate";
import creditCards from "./utilities/creditCards";
import classes from "./Form.module.css";

const minShort = Number(`${new Date().getFullYear()}`.slice(-2));
const minLong = new Date().getFullYear();
const maxShort = Number(`${new Date().getFullYear() + 10}`.slice(-2));
const maxLong = new Date().getFullYear() + 10;

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
      config: {
        name: "cardNumber",
        type: "text",
        placeholder: ""
      },
      validation: {
        requered: true,
        regex: {
          ...creditCards
        },
        minWidth: 13,
        maxWidth: 16
      },
      value: "",
      maskedValue: "",
      errors: false,
      valid: false,
      edited: false,
      touched: false,
      ref: useRef(null)
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
      valid: false,
      edited: false,
      touched: false,
      ref: useRef(null)
    },
    expiration: {
      config: {
        name: "expiration",
        type: "text",
        placeholder: ""
      },
      validation: {
        requered: true,
        regex: /^([0-1][0-12])(\d{2}|\d{4})$/,
        minDate: new Date(new Date().getFullYear(), new Date().getMonth()),
        maxDate: new Date(new Date().getFullYear() + 10, new Date().getMonth())
      },
      value:
        `0${new Date().getMonth() + 1}`.slice(-2) +
        `${new Date().getFullYear()}`.slice(-2),
      maskedValue:
        `0${new Date().getMonth() + 1}`.slice(-2) +
        "/" +
        `${new Date().getFullYear()}`.slice(-2),
      errors: false,
      valid: false,
      edited: false,
      touched: false,
      ref: useRef(null)
    },
    cardCvc: {
      config: {
        name: "cardCvc",
        type: "text"
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
      touched: false,
      ref: useRef(null)
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

    if (name === "cardCvc") {
      value = value.replace(/\D+/g, "").substring(0, 4);
    }

    if (name === "cardNumber" || name === "expiration") {
      onMaskedFieldChange(name, value);
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

  const onMaskedFieldChange = (name, value) => {
    const unmaskValue = {
      cardNumber: value => value.replace(/\D+/g, "").substring(0, 16),
      expiration: value => value.replace(/\D+/g, "").substring(0, 6)
    };

    const maskValue = {
      cardNumber: value =>
        value
          .replace(/(\d{4})/g, "$1 ")
          .replace(/(\d{4}) (\d{4}) (\d{4}) (\d{4}) /, "$1 $2 $3 $4"),
      expiration: value => value.replace(/^(\d{2})(\d{1,4})?$/, "$1/$2")
    };

    let maskedValue;
    const oldMaskedValue = fields[name].maskedValue;
    let unmaskedValue = unmaskValue[name](value);

    //check if user is editing the number
    if (oldMaskedValue.slice(0, -1) === value) {
      maskedValue = value;
    } else {
      maskedValue = maskValue[name](unmaskedValue);
    }

    if (name === "cardNumber") {
      setCardType(checkType(unmaskedValue));
    }

    let errors = validate(unmaskedValue, name, fields[name].validation);

    setFields(state => ({
      ...state,
      [name]: {
        ...state[name],
        value: unmaskedValue,
        maskedValue,
        errors: errors,
        valid: !errors,
        edited: true
      }
    }));
  };

  const onFocus = name => {
    if (name === "cardCvc") {
      setIsFlipped(true);
      setFocusedField("");
    } else {
      setFocusedField(name);
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

  const focusField = name => {
    fields[name].ref.current.focus();
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
        config={fields[key].config}
        value={value}
        onChange={onFieldChange.bind(this, fields[key].config.name)}
        onFocus={onFocus.bind(this, fields[key].config.name)}
        onBlur={onBlur.bind(this, fields[key].config.name)}
        errors={fields[key].errors}
        touched={fields[key].touched}
        ref={fields[key].ref}
      />
    );
  }

  return (
    <div className={classes.FormWrapper} style={style}>
      <Card
        cardNumber={fields.cardNumber.maskedValue}
        cardHolder={fields.cardHolder.value}
        expiration={fields.expiration.maskedValue}
        cardCvc={fields.cardCvc.value}
        isFlipped={isFlipped}
        cardType={cardType}
        focusedField={focusedField}
        focusField={focusField}
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
            <div className={classes.Expiery}>{inputs.expiration}</div>
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
  );
};

export default Form;
