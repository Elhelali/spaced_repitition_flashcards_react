import React, { useEffect, useState } from 'react';
import './Flashcard.css'; // import CSS for styling
import trashIcon from '../../images/trash.png'
import * as requests from '../../requests'

const Flashcard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDeleteCard = (e) =>{
    e.stopPropagation();
    requests.delete_word(props._id).then(res=>{
      if (res.success){
        const newWords = [...props.words].filter(item => item._id !== props._id);
        props.setWords(newWords)
      }
      else(alert("Failed to Delete Word. Please Contact Support"))
    }).catch(()=>{
      (alert("Failed to Delete Word. Please Contact Support"))
    })
  }
  const handleResult =(e,result)=> {
    e.preventDefault()
    e.stopPropagation()
    setIsFlipped(false);
    props.setCurrentWord(null)
    const user = props.user
    const data={
      user:user._id,
      word:props._id,
      bin:props.bin,
      result:result
    }
    requests.submit_result(data).then(res=>{
      props.setUser(res.user)
      props.setCurrentWord(null)

    })
  }

  return (
    <div className="Flashcard" onClick={flipCard}>
      <div className={`Card ${isFlipped ? 'Flipped' : ''}`}>
        <div className="Front">
        {props.admin && <button className='delete_flashcard' 
        onClick={handleDeleteCard}>
          <img style={{height:20}} src={trashIcon} />
          </button>
        }
          <span>{props._id.toUpperCase()}</span>
        </div>
        <div className="Back">
          <span className={props.admin || 'space_for_results'}>{props.definition}</span>
          {!props.admin && 
          <div style={{display:"block"}}>
          <button onClick={(e)=>handleResult(e,true)} className='result_btn' style={{color:'green'}}>I got it</button>
          <button onClick={(e)=>handleResult(e,false)} className='result_btn'style={{color:'red'}}>I did not get it</button>
          </div>
          }
        </div>
      </div>
    </div>
  );
};
export default Flashcard;
