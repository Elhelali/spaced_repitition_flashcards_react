import React from "react";
import Dash from "./Dash";

const Dashes = ({ title, count, filledCount, color }) => {
  return (
    <div style={{ display: "flex", marginBottom: "15px" }}>
      {title}
      {Array.from({ length: count }).map((_, index) => (
        <Dash key={index} filled={index < filledCount} color={color} />
      ))}
    </div>
  );
};

export default Dashes;
