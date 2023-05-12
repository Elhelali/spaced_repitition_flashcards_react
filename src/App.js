import './App.css';
import Admin from './components/Admin';
import UserPage from './components/UserPage';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import * as requests from './requests'

function App() {
  const [viewAdmin, setViewAdmin] = useState(false);
  const [_id, set_id] = useState("");
  const [user, setUser] = useState(null);
  const toggleMode = () =>{
    setViewAdmin(!viewAdmin)
  }
  useEffect(()=>{
    const _id = Cookies.get('_id');
    if (_id){
      requests.get_user().then(res=>{
        if (res.success)
        { 
          setUser(res.user)
        }
        else{
          alert("User Not Found")
        }
      })
    }
    else{
      requests.create_user().then(res=>{
        set_id(res._id)
      })
    }
  },[_id])
  return (
    <div className="App">
      {viewAdmin? <Admin toggleMode={toggleMode} /> : 
      user && <UserPage user={user} setUser={setUser} toggleMode={toggleMode} />}
    </div>
  );
}

export default App;
