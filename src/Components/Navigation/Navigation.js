import React from 'react';

const Navigation = ({ isSignedIn, onButtonRedirect }) => {
  if (isSignedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onButtonRedirect('signin')}  className="f3 pa2 mr2 underline dim black pointer link">Sign Out</p>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p onClick={() => onButtonRedirect('signin')} className="f3 pa2 underline dim black pointer link">Sign In</p>
      <p onClick={() => onButtonRedirect('register')} className="f3 pa2 underline dim black pointer link">Register</p>
      </div>
    )
  }
}

export default Navigation;
