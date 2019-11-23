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
      case "minDate":
        if (value.length === 4) {
          let expiration = getShortExpirationDate(value, validation, key);

          if (expiration < validation[key]) {
            errors.push(`Expiery date can't be in the past`);
          }
        } else if (value.length === 6) {
          let expiration = getLongExpirationDate(value);
          if (expiration < validation[key]) {
            errors.push(`Expiery date can't be in the past`);
          }
        }

        break;

      case "maxDate":
        if (value.length === 4) {
          let expiration = getShortExpirationDate(value, validation, key);

          if (expiration > validation[key]) {
            errors.push(`Expiery date is too far in the future`);
          }
        } else if (value.length === 6) {
          let expiration = getLongExpirationDate(value);
          if (expiration > validation[key]) {
            errors.push(`Expiery date is too far in the future`);
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

function checkLuhn(value) {
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
}

function getShortExpirationDate(value, validation, key) {
  let month = Number(value.slice(0, 2) - 1);
  let year = Number(
    `${validation[key].getFullYear()}`.slice(0, 2) + value.slice(2)
  );
  return new Date(year, month);
}

function getLongExpirationDate(value, validation, key) {
  let month = Number(value.slice(0, 2) - 1);
  let year = Number(value.slice(2));
  return new Date(year, month);
}

export default validate;
