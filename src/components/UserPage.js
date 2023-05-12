import React, { useState, useEffect } from "react";
import "../App.css";
import Flashcard from "./Flashcard/Flashcard";
import * as requests from "../requests";
const _ = require("lodash");

const UserPage = (props) => {
  const words = props?.user?.words || [];
  const [showWords, setShowWords] = useState([]);
  const [done, setDone] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);

  //update user words to mirror admin words
  useEffect(() => {
    requests.get_words().then((words) => {
      const adminWords = words.map((obj) => obj._id);
      const adminWordsSet = new Set(adminWords);
      const userWords = props.user.words.map((obj) => obj.word);
      const userWordsSet = new Set(userWords);
      if (!_.isEqual(adminWordsSet, userWordsSet)) {
        requests
          .update_user_words()
          .then((response) => props.setUser(response.user));
      }
    });
  }, []);

  useEffect(() => {
    //   const bins = [0,5,25,160,600,3600,18000,86400,432000,2160000,10368000];
    const bins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    const calculateShowWords = () => {
      const possibleWords = words.filter(
        (word) => word.bin < 11 && word.wrong_count < 10
      );
      if (possibleWords.length === 0) {
        setDone(true);
        return;
      } else {
        setDone(false);
      }
      const wordsToShow = possibleWords.filter(
        (word) => word.last_answer + bins[word.bin] < Date.now() / 1000
      );
      wordsToShow.sort((a, b) => {
        if (a.bin !== b.bin) {
          return b.bin - a.bin; // For descending order
        } else {
          return a.last_answer - b.last_answer; // For ascending order
        }
      });
      setShowWords(wordsToShow);
      if (wordsToShow.length > 0 && currentWord === null) {
        setCurrentWord(wordsToShow[0]);
      }
    };

    // Run once on mount
    calculateShowWords();

    // Then run every second
    const intervalId = setInterval(calculateShowWords, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [words, currentWord, done]);

  return (
    <div>
      {(!props.user.words && <div className="header">Loading</div>) ||
        (done && (
          <div className="header">
            You have no more words to review; You are permanently done!
          </div>
        )) ||
        (showWords.length > 0 && (
          <div className="header"> Word Count: {showWords.length} </div>
        )) || (
          <div className="header">
            You are temporarily done; please come back later to review more
            words.
          </div>
        )}
      {props.user.admin && (
        <button
          onClick={props.toggleMode}
          className="change_mode"
          id="admin_btn"
        >
          Admin Mode
        </button>
      )}
      {currentWord !== null && (
        <Flashcard
          user={props.user}
          setUser={props.setUser}
          {...currentWord}
          _id={currentWord.word}
          setCurrentWord={setCurrentWord}
        />
      )}
    </div>
  );
};

export default UserPage;
