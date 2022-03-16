import React from "react";

function Button({ path, label, statActions, updateStats, next }) {
  return (
    <button
      onClick={ () => {
        if (statActions) {
          updateStats(statActions);
        }
        next(path);
      } }
    >
      {label}
    </button>
  );
}

function Buttons({ buttons, next, updateStats }) {
  return (
    buttons.map((button, i) => <Button key={ i } { ...button } next={ next } updateStats={ updateStats }/>)
  );
}

export default Buttons;