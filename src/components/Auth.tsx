import React, { useEffect } from 'react';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { sendGetRequest, sendPostRequest } from '../apis';
import TableConfig from './tableConfig.json';

const tables = TableConfig.tables;

const Auth: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        history.push('/theater');
      }
    });

    // Sample API requests
    sendGetRequest(`sample-get-request?param=1`).then(response => console.log(response));
    sendPostRequest(`sample-post-request`, {postParam: 1}).then(response => console.log(response));
  }, []);

  const writeUserData = async (userId: string, name: string | null, email: string | null, imageUrl: string | null) => {
    let tableId: string;
    Firebase.database().ref('users').on('value',async (snap)=> {
      const len =  await Object.keys(snap.val()).length;
      if(len<=38 && len %2 ==0){
        const tableIndex = len /2 -1;
        tableId = tables[tableIndex].id
      } else if (len<=38 && len %2 !== 0){
        const tableIndex = Math.floor(len/2);
        tableId = tables[tableIndex].id
      }else if(len > 38) {
        const tableIndex = len - 38;
        tableId = tables[tableIndex].id;
      }
      Firebase.database().ref('users/' + userId).set({
        username: name,
        tableId: tableId,
        email: email,
        profile_picture : imageUrl
      });
    }); 
  
  }
  const redirect = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  };

  return ( 
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button onClick={redirect}> Login With Google </button>
    </div> 
  );
};
 
export default Auth;