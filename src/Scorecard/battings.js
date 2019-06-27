import React from "react";
import Async from "async";

var extras = 0;
const battings = props => {
  {
    console.log(props.battings.scores);
  }

  let batscore = [
    <tr key="232">
      <th>Player</th>
      <th>Run</th>
      <th>Balls</th>
      <th>6s</th>
      <th>4S</th>
      <th>SR</th>
    </tr>
  ];
  if (props.battings && !props.battings.scores.length) {
    console.log("no score");
    batscore = (
      <tr style={{ textAlign: "center", width: "80%" }}>
        <th>
          <p>Yet to Bat</p>
        </th>
      </tr>
    );
  } else if (props.battings && props.battings.scores.length) {
    console.log(props.battings);
    Async.each(props.battings.scores, async value => {
      if (value.batsman === "Extras") {
        extras = value.detail;
        return false;
      }
      const {
        batsman,
        R,
        SR,
        B,
        "4s": four,
        "6s": six,
        "dismissal-info": dismiss,
        pid
      } = value;
      console.log(batsman, R, SR);
      await batscore.push(
        <tr key={`${pid}1`}>
          <td>
            <p>{batsman}</p>
            <p>{dismiss}</p>
          </td>
          <td>{R}</td>
          <td>{B}</td>
          <td>{six}</td>
          <td>{four}</td>
          <td>{SR}</td>
        </tr>
      );
    });
  }
  return (
    <tbody>
      {batscore}
      <tr>
        <td>Extras</td>
        <td>{extras ? extras : 0}</td>
      </tr>
    </tbody>
  );
};

export default battings;
