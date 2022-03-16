import React from "react";

function Button({ path, label, newStats, next }) {
  return (
    <button onClick={ () => next(path)}>{label}</button>
  );
}

function Buttons({ buttons, next }) {
  return (
    buttons.map((button, i) => <Button { ...button } next={ next } />)
  );
}

export default Buttons;