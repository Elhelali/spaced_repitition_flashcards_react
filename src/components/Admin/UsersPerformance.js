import React, { useState, useEffect } from "react";
import * as requests from "../../requests";
import { List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import Dashes from "./Dashes";

const UsersPerformance = () => {
  const [users, setUsers] = useState([]);
  const bins = [0,5,25,160,600,3600,18000,86400,432000,2160000,10368000];

  useEffect(() => {
    requests.get_all_users().then((data) => {
      setUsers(data.users);
    });
  }, []);
  const updateWords = (userId) =>{
    requests.admin_update_user_words(userId).then(response=>{
        const updatedUsers = [...users]
        const updatedUserIndex = updatedUsers.findIndex(user => user._id === userId);
        if (updatedUserIndex !== -1) {
            updatedUsers[updatedUserIndex] = response.user;
        }
        setUsers(updatedUsers);
    })
  }
  const getNextShow = (word) => {
    if (word.wrong_count ===10 || word.bin ===11) {
        return "None";
    } else {
        const differenceInSeconds = Math.floor(word.last_answer + bins[word.bin] - Date.now() / 1000);
        if (differenceInSeconds < 60) {
            return differenceInSeconds > 0 ? `${differenceInSeconds} seconds` : "Now";
        } else if (differenceInSeconds < 3600) {
            const minutes = Math.floor(differenceInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (differenceInSeconds < 86400) {
            const hours = Math.floor(differenceInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(differenceInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''}`;
        }
    }
}


  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Array.isArray(users) &&
        users.length > 0 &&
        users.map((user) => (
          <div key={user._id} style={{ flex: "1 0 20rem", margin: "1rem" }}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        ID: {user._id}
                      </Typography>
                      <button onClick={()=>updateWords(user._id)} style={{display:"block",cursor:"pointer"}}>Update Words</button>
                      {user.words.map((word, index) => (
                        <Typography
                          key={index}
                          component="p"
                          variant="body1"
                          color="textSecondary"
                          style={{borderBottom:"1px solid grey"}}
                        >
                          <p style={{color:"black",fontWeight:600,padding:"5"}}>{word.word}</p>
                          Bin
                          <Dashes color={"#3a5b86"} count={11} filledCount={word.bin} />
                          Wrong
                          <Dashes color={"red"} count={10} filledCount={word.wrong_count} />
                          Next Show: {
                            getNextShow(word)
                          }
                        </Typography>
                      ))}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </List>
          </div>
        ))}
    </div>
  );
};

export default UsersPerformance;
