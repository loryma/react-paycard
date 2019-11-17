const validate = (value, name, validation) => {
  let errors = [];
  for (const key in validation) {
    switch (key) {
      case "requered":
        if (validation[key] === true) {
          if (value.trim().length === 0) {
            errors.push("This field is requered");
          }
        }
        break;
      case "regex":
        if (name === "cardNumber") {
          let regexValue = false;
          for (const x in validation[key]) {
            regexValue = regexValue || validation[key][x].test(value);
          }

          const valid = checkLuhn(value);

          if (!regexValue || !valid) {
            errors.push("Incorrect number");
          }
        } else if (!validation[key].test(value)) {
          errors.push("Incorrect number");
        }
        break;
      case "min":
        if (value.length === 2) {
          if (Number(value) < validation[key].short) {
            errors.push(`Expiery date can't be in the past`);
          }
        } else if (value.length === 4) {
          if (Number(value) < validation[key].long) {
            errors.push(`Expiery date can't be in the past`);
          }
        }

        break;

      case "max":
        if (value.length === 2) {
          if (Number(value) > validation[key].short) {
            errors.push(`Expiery date is incorrect`);
          }
        } else if (value.length === 4) {
          if (Number(value) > validation[key].long) {
            errors.push(`Expiery date is incorrect`);
          }
        }

        break;
      case "minWidth":
        if (value.length < validation[key]) {
          errors.push(`Too short`);
        }
        break;

      case "maxWidth":
        if (value.length > validation[key]) {
          errors.push(`Too long`);
        }
        break;
      default:
        console.log("Unknown validation key");
    }
  }

  return errors.length > 0 ? errors : false;
};

const checkLuhn = value => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i));

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export default validate;
