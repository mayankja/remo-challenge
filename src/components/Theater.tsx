import React, { useEffect, useState } from 'react';
import './Theater.scss'; 
import MapImage from '../assets/conference-map.svg';
import Firebase from '../services/firebase';
import TableConfig from './tableConfig.json';

const Theater: React.FC = () => {

  const [ userData, setUserData ] = useState({});
  const [loggedUser, setLoggedUser] = useState <any> ({});
 
  useEffect(() => {
    Firebase.database().ref('users').on('value', (snap) => {
      const data =  snap.val();
      setUserData(data);
    });

    Firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setLoggedUser(user);
      }
    });
  }, []);

  return ( 
    <div className='remo-theater' style={{width: TableConfig.width, height: TableConfig.height}}>
      <button>Find Me </button>
      <div className='rt-app-bar' >
        <a href='javascript:;'>Logout</a>
      </div>
      <div className='rt-rooms'>
         
        {TableConfig.tables.map(table => {
          const data =  Object.values(userData).filter((val: any) => val.tableId == table.id);
          return(
        <div className='rt-room' style={{width: table.width, height: table.height, top: table.y, left: table.x}}>
          <div className='rt-room-name'>{table.id}</div>
          {data &&  data.map((obj: any, key)  => (
            <>
              <img className="image" style ={{ borderRadius: "50%", position: "absolute", width: "35px", height: "35px", top: table.seats[key].y , left: table.seats[key].x }}src= {obj.profile_picture}/>
            {loggedUser.email === obj.email &&  <span style ={{ position: "absolute", width: "30px", height: "30 px", top: table.seats[key].y , left: table.seats[key].x }} className="fa fa-star checked"></span>}
            </>
          ) ) }
        </div>
        )})}
      </div>
      <div className='rt-background'>
        <img src={MapImage} alt='Conference background'/>
      </div>
    </div>
  );
};
 
export default Theater;