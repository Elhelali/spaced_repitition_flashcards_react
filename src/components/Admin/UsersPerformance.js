import React, { useState, useEffect } from "react";
import * as requests from "../../requests";
import { List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import Dashes from "./Dashes";

const UsersPerformance = () => {
  const [users, setUsers] = useState([]);

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
                        >
                          {word.word} <Dashes filledCount={word.bin} />
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
