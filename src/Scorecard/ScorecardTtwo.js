import React from "react";
import Async from "async";
import classes from "./ScorecardTone.css";
import Battings from "./battings";
import Bowlings from "./bowlings";

const score = props => {
  console.log(props.batting && props.batting[1] && props.batting[1].scores);
  let batCard = [];
  let bowlCard = [];
  if (props.batting && props.batting[1] && props.batting[1].scores) {
    batCard = <Battings battings={props.batting[1]} />;
    bowlCard = <Bowlings bowlings={props.bowling[1]} />;
  }
  return (
    <React.Fragment>
      <p>Batting</p>
      <table>{batCard}</table>
      <p>Bowling</p>
      <table className={classes.Table}>{bowlCard}</table>
    </React.Fragment>
  );
};

export default score;
