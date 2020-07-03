import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ ImageUrl, allbox }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="ImageInput" className="pt2" width='500px' height='auto' alt='' src={ImageUrl} />
        {allbox.map((box, i) => {
          return <div key={i} className="bounding-box" style={{ top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol }}>
          </div>
        })}
      </div>
    </div>
  )
}

export default FaceRecognition;
