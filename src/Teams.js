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
        {props.matchStarted ? (
          <p>Match has Started</p>
        ) : (
          <p>Match is yet to start</p>
        )}
        <img src={link1} alt={props.teamTwo} />
      </div>
    </React.Fragment>
  );
};

export default teams;
