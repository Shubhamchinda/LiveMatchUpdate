import React, { Component } from "react";
import axios from "axios";
import cron, { CronJob } from "cron";
import Score from "./Score";
import classes from "./App.css";
import Teams from "./Teams";
import Spinner from "./Spinner";
import ScoreCardOne from "./../src/Scorecard/ScorecardTone";
import ScoreCardTwo from "./../src/Scorecard/ScorecardTtwo";

class CricAPI extends Component {
  state = {
    score: "India v Pakistan",
    stat: "Internet is not good, try connecting again.",
    team1: `India`,
    team2: `Pakistan`,
    firstRun: true,
    matchStart: false,
    loading: false,
    scoreCard: {},
    batting: [],
    bowling: [],
    scoreCards: []
  };
  getMatch = () => {
    return axios.get(
      "https://cricapi.com/api/cricketScore?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144516"
    );
  };

  getScoreCard = () => {
    return axios.get(
      "https://cricapi.com/api/fantasySummary?apikey=ArPh3wmOLGgKDv0mfa7grHuxYjq1&unique_id=1144516"
    );
  };

  // var scoreCard = [];
  componentDidMount() {
    if (this.state.firstRun) {
      axios
        .all([this.getMatch(), this.getScoreCard()])
        .then(
          axios.spread((match, scrCard) => {
            console.log(match.data);
            console.log(scrCard);
            this.setState({
              score: match.data.score,
              stat: match.data.stat,
              team1: match.data["team-1"],
              team2: match.data["team-2"],
              firstRun: false,
              matchStart: match.data.matchStarted,
              loading: false
            });
            this.setState({
              scoreCard: scrCard.data,
              batting: [...scrCard.data.data.batting],
              bowling: [...scrCard.data.data.bowling]
            });
            // Both requests are now complete
          })
        )
        .catch(error => {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
    new CronJob(
      "*/20 * * * * *",
      () => {
        console.log("You will see this message every 20th second");
        axios
          .all([this.getMatch(), this.getScoreCard()])
          .then(
            axios.spread((match, scrCard) => {
              this.setState({
                score: match.data.score,
                stat: match.data.stat
              });
              this.setState({
                scoreCard: scrCard.data,
                batting: [...scrCard.data.data.batting],
                bowling: [...scrCard.data.data.bowling]
              });
              // Both requests are now complete
            })
          )
          .catch(error => {
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
  selectTeamScore1 = () => {
    let one = (
      <ScoreCardOne
        // data={this.state.scoreCard ? this.state.scoreCard.data : []}
        batting={this.state.batting ? this.state.batting : []}
        bowling={this.state.bowling ? this.state.bowling : []}
        teamOne={this.state.team2}
      />
    );
    this.setState({
      scoreCards: [one]
    });
  };
  selectTeamScore2 = () => {
    this.setState({
      scoreCards: [
        <ScoreCardTwo
          data={this.state.scoreCard ? this.state.scoreCard.data : []}
          batting={this.state.batting ? this.state.batting : []}
          bowling={this.state.bowling ? this.state.bowling : []}
          teamOne={this.state.team2}
        />
      ]
    });
  };

  render() {
    let loadSpin = <Spinner />;
    let onclickTeam = <Spinner />;
    if (!this.state.loading) {
      let ScoreCards = <Spinner />;
      if (this.state.scoreCard && this.state.batting) {
        onclickTeam = (
          <table
            style={{ width: "80%", textAlign: "center", marginLeft: "80px" }}
            className={classes.AppTeam}
          >
            <tbody>
              <tr>
                <th onClick={this.selectTeamScore1}>{this.state.team1}</th>
                <th onClick={this.selectTeamScore2}>{this.state.team2}</th>
              </tr>
            </tbody>
          </table>
        );
      }

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

          <div>
            <h3 style={{ color: "#a4000f" }}>
              Click on team's name to view Scorecard
            </h3>
            {onclickTeam}
            {this.state.scoreCards}
          </div>
        </div>
      );
    }
    return <div>{loadSpin}</div>;
  }
}

export default CricAPI;
