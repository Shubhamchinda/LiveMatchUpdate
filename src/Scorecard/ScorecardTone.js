import React from "react";
import Async from "async";
import classes from "./ScorecardTone.css";
import Battings from "./battings";
import Bowlings from "./bowlings";

const score = props => {
  console.log(props.batting && props.batting[0] && props.batting[0].scores);
  let batCard = [];
  let bowlCard = [];
  if (props.batting && props.batting[0] && props.batting[0].scores) {
    console.log(props.bowling[0]);
    batCard = <Battings battings={props.batting[0]} />;
    bowlCard = <Bowlings bowlings={props.bowling[0]} />;
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
