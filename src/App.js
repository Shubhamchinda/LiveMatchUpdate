import React, { Component } from "react";
import axios from "axios";
import cron, { CronJob } from "cron";
import Score from "./Score";
import classes from "./App.css";
import Teams from "./Teams";
import Spinner from "./Spinner";

class CricAPI extends Component {
  state = {
    score: "India v Pakistan",
    stat: "Internet is not good, try connecting again.",
    team1: `India`,
    team2: `Pakistan`,
    firstRun: true,
    matchStart: false,
    loading: true
  };

  componentDidMount() {
    if (this.state.firstRun) {
      axios
        .get(
          "https://cricapi.com/api/cricketScore?apikey=Aa74ktAdYXVl4MGv4NIc2vE19yx1&unique_id=1144512"
        )
        .then(response => {
          console.log(response.data);
          this.setState({
            score: response.data.score,
            stat: response.data.stat,
            team1: response.data["team-1"],
            team2: response.data["team-2"],
            firstRun: false,
            matchStart: response.data.matchStarted,
            loading: false
          });
        })
        .catch(error => {
          // handle error
          this.setState({ loading: false });
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
            "https://cricapi.com/api/cricketScore?apikey=Aa74ktAdYXVl4MGv4NIc2vE19yx1&unique_id=1144512"
          )
          .then(response => {
            console.log(response.data.matchStarted);
            this.setState({
              score: response.data.score,
              stat: response.data.stat
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
    let loadSpin = <Spinner />;
    if (!this.state.loading) {
      loadSpin = (
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
          ) : (
            <Score newStat={this.state.stat} />
          )}
        </div>
      );
    }
    return <div>{loadSpin}</div>;
  }
}

export default CricAPI;
