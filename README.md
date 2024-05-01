## Paycard React component

[![Netlify Status](https://api.netlify.com/api/v1/badges/bf7b5af7-d84e-474c-897a-f7a5056d696b/deploy-status)](https://app.netlify.com/sites/react-paycard/deploys)

Deployed on Netlify at https://master--react-paycard.netlify.app

**Paycard signature**

```
<Form
    onSubmit={data => data}
    style={maxWidth: "570px"}
/>
```

**Paycard component** expects:

- `onSubmit` prop with a callback to pass form data into after user submits data
- optional `style` prop which will be passed on to form wrapper DOM node as inline styling.

**Features**

- masked input for card number with card type autodetecton
- general card number validity check for all major card types, validity check with [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)
- masked expiery date field, expiery validity sanity check, dates yearlier then current month or later then 10 years from now are not allowed
- clicking animated card fields focus corresponding form field
- card rotates to reveal cvv field when corresponding cvv field is focused

**Implementation details**

- built with React hooks
- state is preserved with _useState_ hook
- _useRef_ is used to get reference to DOM nodes to focus form fields on click and to get card DOM nodes position, width, height
- custom _useForceUpdate_ is used to rerender interactive card on window resize to update focus `<div>` element dimentions that highlights currently focused field
- _useEffect_ hook is used to subsctibe to window resize events
- [react-transition-group](https://github.com/reactjs/react-transition-group) package is used to animate characters on interactive card on user input
- CSS 3D is used for card rotation
