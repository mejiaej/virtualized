import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Window } from "./components/Window";

function App() {
  return (
    <div className="App">
      <Window rowHeight={40}>
        {new Array(15000)
          .fill({})
          .map((_, index) => ({ id: index }))
          .map((item) => (
            <li key={item.id}>{item.id}</li>
          ))}
      </Window>
    </div>
  );
}

export default App;
