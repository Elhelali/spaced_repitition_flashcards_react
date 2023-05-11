import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import * as requests from '../requests'
import '../App.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddWordModal(props) {
  const [open, setOpen] = React.useState(false);
  const[errorMessage,setErrorMessage] = React.useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (e) =>{
    e.preventDefault()
    const word = e.target.word.value
    //check if word already exists
    const wordExists = props.words.find(existing_word=>existing_word._id === word.toLowerCase()) 
    if (wordExists){
      setErrorMessage("World Already Exists")
      return
    }
    // Get definition of the word from external api
    requests.get_definition(e.target.word.value).then(
      data=> {
        if (data.title === "No Definitions Found"){
          setErrorMessage(data.title)
          return
        }
        if (Array.isArray(data)){
          const definition = data[0].meanings[0].definitions[0].definition
          requests.add_word(word,definition).then(res=>{
            if (res.success) {
              let newWords = [...props.words]
              newWords.unshift({_id:word,definition:definition})
              props.setWords(newWords)
              setOpen(false)
            }
            else{
              setErrorMessage("Definition not found for word")
              return
            }
          }).catch(()=>setErrorMessage("Error Occured, Please Contact Support"))
        }
      }
    ).catch((e)=>{
      setErrorMessage(e.response.data.message.replace(' pal',""))
    })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
          {props.deletable && <button><Typography>Filled</Typography></button>}
          <input id="add_word_input" name="word" placeholder='Word' />
          <p className="error_message">{errorMessage}</p>
          <button id="add_word_submit" type="submit">Add</button>
        </form>
        </Box>
      </Modal>
    </div>
  );
}