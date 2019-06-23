import React, { Component } from "react";
import axios from "axios";
import cron, { CronJob } from "cron";
import Score from "./Score";
import classes from "./App.css";
import Teams from "./Teams";

class CricAPI extends Component {
  state = {
    score: "india 220/1 v pakistan 230/10",
    stat: "India is trailing by 10 runs",
    team1: `India`,
    team2: `Pakistan`,
    firstRun: true,
    matchStart: false
  };

  componentDidMount() {
    if (this.state.firstRun) {
      axios
        .get(
          "https://cricapi.com/api/cricketScore?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144512"
        )
        .then(response => {
          console.log(response.data);
          this.setState({
            score: response.data.score,
            stat: response.data.stat,
            team1: response.data["team-1"],
            team2: response.data["team-2"],
            firstRun: false,
            matchStart: response.data.matchStarted
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
    new CronJob(
      "*/2 * * * *",
      () => {
        console.log("You will see this message every 2nd minute");
        axios
          .get(
            "https://cricapi.com/api/cricketScore?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144512"
          )
          .then(response => {
            console.log(response.data.matchStarted);
            this.setState({
              score: response.data.score,
              stat: response.data.stat,
              team1: response.data["team-1"],
              team2: response.data["team-2"],
              matchStart: response.data.matchStarted
            });
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .finally(function() {
            // always executed
          });
      },
      null,
      true
    );
  }

  render() {
    return (
      <div>
        <div className={classes.App}>
          <h1 style={{ paddingTop: 25 }}>Cricket World Cup</h1>
          <Teams
            teamOne={this.state.team1}
            teamTwo={this.state.team2}
            matchStarted={this.state.matchStart}
          />
          {this.state.matchStart ? (
            <Score
              newScoreTeam1={this.state.score.split("v").shift()}
              newScoreTeam2={this.state.score.split("v").pop()}
              newStat={this.state.stat}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CricAPI;
