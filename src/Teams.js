import React from "react";
import classes from "./Teams.css";

const teams = props => {
  let link = `https://www.countries-ofthe-world.com/flags-normal/flag-of-${props.teamOne
    .split(" ")
    .join("-")}.png`;
  let link1 = `https://www.countries-ofthe-world.com/flags-normal/flag-of-${props.teamTwo
    .split(" ")
    .join("-")}.png`;
  console.log(props.matchStarted);
  return (
    <React.Fragment>
      <div className={classes.Teams}>
        <img src={link} alt={props.teamOne} />
        {props.matchStarted ? <p>Live</p> : <p>Match is yet to start</p>}
        <img src={link1} alt={props.teamTwo} />
      </div>
      {!props.matchStarted ? (
        <h4>
          {props.teamOne} <br />
          vs
          <br /> {props.teamTwo}
        </h4>
      ) : null}
    </React.Fragment>
  );
};

export default teams;
