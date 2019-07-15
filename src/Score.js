import React from "react";
import classes from "./Score.css";

const score = props => {
  return (
    <React.Fragment>
      <div className={classes.Score}>
        <p>{props.newScoreTeam1}</p>
        <p>{props.newScoreTeam2}</p>
      </div>
      <p>{props.newStat}</p>
    </React.Fragment>
  );
};

export default score;
