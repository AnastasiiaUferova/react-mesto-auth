import React from 'react';
import NavBar from './NavBar.js';
import DuckList from './DuckList.js';

function Ducks ({signOut}) {
  return (
    <>
      <NavBar signOut={signOut}/>
      <DuckList />
    </>
  )
}

export default Ducks;
