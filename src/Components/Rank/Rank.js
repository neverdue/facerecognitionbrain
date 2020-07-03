import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div className="tc">
      <div className="f3 white">
        {`${name}, your current entry count is...`}
      </div>
      <div className="f1 white">{entries}</div>
    </div>
  )
}

export default Rank;
