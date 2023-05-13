import React from "react";

const Dash = ({ color, filled }) => {
  const style = {
    height: "10px",
    width: "10px",
    position: "relative",
    top: "5px",
    border: "1px solid black",
    backgroundColor: filled ? color : "white", // Change 'blue' to your preferred color
  };

  return <div style={style} />;
};

export default Dash;
