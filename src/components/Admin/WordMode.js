
import React , { useState , useEffect } from "react";
import AddWordModal from "../../components/AddWordModal";
import Flashcard from "../../components/Flashcard/Flashcard";
import * as requests from "../../requests";

const WordMode =()=>{
    const [words, setWords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        requests.get_words().then((words) => {
          setWords(words);
        });
      }, []);

    return (
        <>
        {words && <div> Word Count: {words.length}</div>}
      <button className="admin_btn" onClick={() => setIsModalOpen(true)}>Add Word</button>
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
        </>
)
        }

export default WordMode;
