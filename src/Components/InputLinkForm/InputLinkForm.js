import React from 'react';
import './InputLinkForm.css';

const InputLinkForm = ({ onInputChange, onButtonSubmit, onButtonEnterDetect }) => {
  return (
    <div className="tc">
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures. Give it a try'}
      </p>
      <div className="form center pa4 br3 shadow-2">
      <input
      className="f4 pa2 w-70"
      type="text"
      onKeyUp={onButtonEnterDetect}
      onChange={onInputChange}
      />
      <button
      className="w-30 grow link f4 ph3 pv2 white dib bg-light-purple ba b--light-purple"
      onClick={onButtonSubmit}>
      Detect
      </button>
      </div>
    </div>
  )
}

export default InputLinkForm;
