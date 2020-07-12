import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
    <Tilt className="Tilt shadow-2 br3 tc" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
      <div className="Tilt-inner pa3 tc">
        <img style={{ paddingTop: '1px' }}  alt="logo" src={brain} />
      </div>
    </Tilt>
    <p className="tc f6 ma3 shadow-2 br3" style={{height: "54px", width: "150px", "marginLeft": "0px"}}>Icon made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="http://www.flaticon.com/" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></p>
    </div>
  )
}

export default Logo;
