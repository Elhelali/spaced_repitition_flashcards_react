import React from 'react';
import Dash from './Dash';

const Dashes = ({ filledCount }) => {
  const totalDashes = 12;

  return (
    <div style={{ display: 'flex', }}>
      {Array.from({ length: totalDashes }).map((_, index) => (
        <Dash key={index} filled={index < filledCount} />
      ))}
    </div>
  );
};

export default Dashes;