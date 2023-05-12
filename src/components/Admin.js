import React, { useState, useEffect } from "react";
import "../App.css";
import * as requests from "../requests";
import Flashcard from "./Flashcard/Flashcard";
import AddWordModal from "./AddWordModal";
const Admin = (props) => {
  const [words, setWords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    requests.get_words().then((words) => {
      setWords(words);
    });
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={props.toggleMode} className="change_mode" id="admin_btn">
        User Mode
      </button>

      {words && <div> Word Count: {words.length}</div>}
      <button onClick={() => setIsModalOpen(true)}>Add Word</button>
      <AddWordModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        words={words}
        setWords={setWords}
      />
      {words &&
        words.map((word, index) => (
          <Flashcard
            key={index}
            admin={true}
            words={words}
            setWords={setWords}
            {...word}
          />
        ))}
    </div>
  );
};

export default Admin;
