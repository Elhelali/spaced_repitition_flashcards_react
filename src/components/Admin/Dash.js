import React from 'react';

const Dash = ({ filled }) => {
  const style = {
    height: '10px',
    width: '10px',
    border: '1px solid black',
    backgroundColor: filled ? '#3a5b86' : 'white', // Change 'blue' to your preferred color
  };
  
  return (
    <div style={style} />
  );
};

export default Dash;