import React from "react";
import Async from "async";

const bowling = props => {
  console.log(props.bowlings);
  let bowling = [
    <tr key="342">
      <th>Player</th>
      <th>O</th>
      <th>M</th>
      <th>R</th>
      <th>W</th>
      <th>Econ</th>
    </tr>
  ];
  if (props.bowlings && !props.bowlings.scores.length) {
    bowling = (
      <tr style={{ textAlign: "center", width: "80%" }}>
        <th>
          <p>Yet to Bowl</p>
        </th>
      </tr>
    );
  }
  if (props.bowlings && props.bowlings.scores && props.bowlings.scores.length) {
    Async.each(props.bowlings.scores, value => {
      if (value.bowler === "Extras") {
        return false;
      }
      const { bowler, R, O, M, Econ, W, pid } = value;
      bowling.push(
        <tr key={pid}>
          <td>{bowler}</td>
          <td>{O}</td>
          <td>{M}</td>
          <td>{R}</td>
          <td>{W}</td>
          <td>{Econ}</td>
        </tr>
      );
    });
  }
  return <tbody>{bowling}</tbody>;
};

export default bowling;
