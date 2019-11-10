const visa = /^4/;
const masterCard = /^(?:5[1-5])/;
const americanExpress = /^(?:3[47])/;
const discovery = /^(?:6(?:011|5[0-9][0-9]))/;
const dinnersClub = /^(?:3(?:0[0-5]|[68][0-9]))/;
const jcb = /^(?:(?:2131|1800|35))/;

const checkType = value => {
  if (visa.test(value)) {
    return "visa";
  } else if (masterCard.test(value)) {
    return "masterCard";
  } else if (americanExpress.test(value)) {
    return "americanExpress";
  } else if (discovery.test(value)) {
    return "discovery";
  } else if (dinnersClub.test(value)) {
    return "dinnersClub";
  } else if (jcb.test(value)) {
    return "jcb";
  } else {
    return "";
  }
};

export default checkType;
