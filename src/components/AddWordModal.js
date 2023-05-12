import React, { useState,useEffect }from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import * as requests from "../requests";
import "../App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddWordModal(props) {
  const [definition, setDefinition] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  //clear previous input on mount
  useEffect(()=>{
    setDefinition("")
    setErrorMessage("")
  },[props.isOpen])
  const handleSubmit = (e) => {
    e.preventDefault();
    const word = e.target.word.value;
    // check word is not empty
    if (word === ""){
      setErrorMessage("Please Type Word");
      return;
    }
    //check if word already exists
    const wordExists = props.words.find(
      (existing_word) => existing_word._id === word.toLowerCase()
    );
    if (wordExists) {
      setErrorMessage("World Already Exists");
      return;
    }
    // Get definition of the word from external api
    if(definition ==="")
    {
      requests
      .get_definition(e.target.word.value)
      .then((data) => {
        if (data.title === "No Definitions Found") {
          setErrorMessage(data.title);
          return Promise.reject(data.title);
        }
        if (Array.isArray(data)) {
          const newDefinition = data[0].meanings[0].definitions[0].definition;
          setDefinition(newDefinition);
          return newDefinition; // return this for the next then
        }
      })
      .then((newDefinition) => {
        // newDefinition here should be the same as the one set in the state
        add_word(word, newDefinition);
      })
      .catch((e) => {
        console.log(e)
        const errorMessage = (e.response && e.response.data.message)
          ? e.response.data.message.replace(" pal", "")
          : e;
        setErrorMessage(errorMessage);
      });    
    }
    else{
      add_word(word,definition)
    }
    }

  const add_word = (word,definition) =>{
    requests
            .add_word(word, definition)
            .then((res) => {
              if (res.success) {
                let newWords = [...props.words];
                newWords.unshift({ _id: word, definition: definition });
                props.setWords(newWords);
                props.closeModal();
                setDefinition=""
                setErrorMessage=""
              } else {
                setErrorMessage("Definition not found for word");
                return;
              }
            })
            .catch(() =>
              setErrorMessage("Error Occured, Please Contact Support")
            );
        }
  
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            {props.deletable && (
              <button>
                <Typography>Filled</Typography>
              </button>
            )}
            <input className="add_word_input" name="word" placeholder="Word" />
            <input className="add_word_input" 
            name="definition" 
            value={definition}
            onChange={(e) => {
              setDefinition(e.target.value);
            }}
            placeholder="Add Definition" />
            <p className="error_message">{errorMessage}</p>
            <button id="add_word_submit" type="submit">
              { definition === "" ? "Lookup Definition & Add":"Add"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
