import React, { Component } from "react";
import axios from "axios";
import cron, { CronJob } from "cron";
import Score from "./Score";
import classes from "./App.css";

class CricAPI extends Component {
  state = {
    score: "",
    stat: ""
  };

  // componentDidMount() {
  //   new CronJob(
  //     "*/2 * * * *",
  //     () => {
  //       console.log("You will see this message every 2nd minute");
  //       axios
  //         .get(
  //           "https://cricapi.com/api/cricketScore?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144510"
  //         )
  //         .then(response => {
  //           console.log(response.data);
  //           this.setState({ score: response.data.score, stat : response.data.stat });
  //         })
  //         .catch(function(error) {
  //           // handle error
  //           console.log(error);
  //         })
  //         .finally(function() {
  //           // always executed
  //         });
  //     },
  //     null,
  //     true
  //   );
  // }

  render() {
    let x = {
      ...this.state.score
    };
    return (
      <div className="App">
        <h1>Cricket World Cup </h1>
        <Score newScore={this.state.score} newStat={this.state.stat} />
      </div>
    );
  }
}

export default CricAPI;
