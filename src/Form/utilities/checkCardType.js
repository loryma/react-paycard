const visa = /^4/;
const masterCard = /^(?:5[1-5])/;
const americanExpress = /^(?:3[47])/;
const discovery = /^(?:6(?:011|5[0-9][0-9]))/;

const cards = {
  visa: /^4/,
  masterCard: /^5[1-5]/,
  americanExpress: /^3[47]/,
  discover: /^65/,
  dinersClub: /^3(?:0[0-5]|[68][0-9])/,
  jcb: /^(?:2131|1800|35[0-9]{3})/
};

const checkType = value => {
  let type = "";
  for (const card in cards) {
    if (cards[card].test(value)) {
      type = card;
    }
  }
  return type;
};

export default checkType;
