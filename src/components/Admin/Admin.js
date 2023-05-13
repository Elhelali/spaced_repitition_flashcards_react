import React, { useState } from "react";
import "../../App.css";
import UsersPerformance from "./UsersPerformance";
import WordMode from "./WordMode";

const Admin = (props) => {

  //toggle between creating words or checking users performance true = word mode, false = performance mode
  const [wordsPerformanceToggle, setWordsPerformanceToggle] = useState(true);

  return (
    <div>
      <h1>Admin</h1>
      
      <button className="admin_btn" style={{marginBottom:"25px"}} onClick={() => setWordsPerformanceToggle(!wordsPerformanceToggle)}>
        {wordsPerformanceToggle? "Check User Performance" : "Check Word List"}</button>

      <button onClick={props.toggleMode} className="change_mode" id="user_btn">
        User Mode
      </button>
      { wordsPerformanceToggle?  <WordMode /> : <UsersPerformance /> }
    </div>
  );
};

export default Admin;
