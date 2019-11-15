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

          if (!regexValue) {
            errors.push("Incorrect number");
          }
        }
        break;
      case "min":
        if (Number(value) < validation[key]) {
          errors.push(`Can't be less then ${validation[key]}`);
        }
        break;

      case "max":
        if (Number(value) > validation[key]) {
          errors.push(`Can't be more then ${validation[key]}`);
        }
        break;
      case "minWidth":
        if (value.length < validation[key]) {
          errors.push(`Should be longer then ${validation[key]}`);
        }
        break;

      case "maxWidth":
        if (value.length > validation[key]) {
          errors.push(`Should be shorter then ${validation[key]}`);
        }
        break;
      default:
        console.log("Unknown validation key");
    }
  }

  return errors.length > 0 ? errors : false;
};

export default validate;
