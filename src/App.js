import React from "react";
import Form from "./Form/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Form onSubmit={data => console.log(data)} />
    </div>
  );
}

export default App;
