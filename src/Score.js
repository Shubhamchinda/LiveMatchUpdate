import React from "react";

const score = props => {
  let x;
  return (
    <React.Fragment>
      <h1>{props.newScore}</h1>
      <p>{props.newStat}</p>
    </React.Fragment>
  );
};

export default score;
