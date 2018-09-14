//import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../actions";
import Chart from "./Chart";
class Results extends Component {
  constructor(props) {
    super(props);
    this.computeAv = this.computeAv.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.getCommunityChart = this.getCommunityChart.bind(this);
    this.state = {
      arrScores: [],
      mapSubject: {},
      chartData: {},
      communityChartData: {},
      arrData: {
        l25: 0,
        o25l50: 0,
        o50l75: 0,
        o75: 0
      }
    };
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  componentDidUpdate(prevProps) {
    const { allUsers, auth } = this.props;
    if (
      allUsers &&
      (allUsers !== prevProps.allUsers || auth !== prevProps.auth) &&
      auth &&
      auth.submitted &&
      auth.submitted.length > 0
    ) {
      var subjectMap = {};
      allUsers.forEach(element => {
        if (element.survey && auth && auth.survey) {
          let category = element.survey[0].name;
          if (auth.survey[0].name === category) {
            this.computeAv(element.submitted);
          }
          if (subjectMap[category]) {
            subjectMap[category]++;
          } else {
            subjectMap[category] = 1;
          }
        }
      });

      this.setState({ mapSubject: subjectMap });
      this.getCommunityChart(subjectMap);
      this.getChartData();
    }
  }
  getChartData() {
    const { arrData } = this.state;
    //console.log(arrData);
    this.setState({
      chartData: {
        labels: ["< 25%", "26-50%", "51-75%", ">75%"],
        datasets: [
          {
            label: "Scores",
            data: [arrData.l25, arrData.o25l50, arrData.o50l75, arrData.o75],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(255,159,64,0.6)"
            ]
          }
        ]
      }
    });
  }
  getCommunityChart(subjectMap) {
    var arrSubjectKeys = [];
    var arrSubjectValue = [];
    Object.keys(subjectMap).forEach(function(key) {
      arrSubjectKeys.push(key);
      arrSubjectValue.push(subjectMap[key]);
    });
    this.setState({
      communityChartData: {
        labels: arrSubjectKeys,
        datasets: [
          {
            label: "Scores",
            data: arrSubjectValue,
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(255,159,64,0.6)"
            ]
          }
        ]
      }
    });
  }
  computeAv(subject) {
    const { arrData } = this.state;
    var count = 0;
    var nCorrect = 0;
    subject.forEach(question => {
      if (question.correct) {
        nCorrect++;
      }
      count++;
    });
    var av = nCorrect / count;
    if (isNaN(av)) {
      av = 0;
    }
    var tmpArr = this.state.arrScores;
    tmpArr.push(av);
    this.setState({ arrScores: tmpArr });
    if (av <= 0.25) {
      arrData.l25++;
    } else if (av <= 0.5) {
      arrData.o25l50++;
    } else if (av <= 0.75) {
      arrData.o50l75++;
    } else if (av > 0.75) {
      arrData.o75++;
    }
  }
  renderPercentRight() {
    const { auth } = this.props;
    const { arrScores } = this.state;
    var count = 0;
    var nCorrect = 0;
    let sum = 0;
    let avCount = 0;
    auth.submitted.forEach(element => {
      if (element.correct) {
        nCorrect++;
      }
      count++;
    });
    for (var i = 0; i < arrScores.length; i++) {
      sum += arrScores[i];
      avCount++;
    }
    let yourScore = (nCorrect / count) * 100;
    let avScore = ((sum / avCount) * 100).toFixed(2);
    return (
      <div className="card-title info">
        Your Score: {yourScore}%<br />
        Average: {avScore}%
      </div>
    );
  }
  renderCompareAllUsers() {
    const { communityChartData } = this.state;
    return (
      <div className="allUsers">
        <div className="card blue-grey white-text">
          <div className="card-content">
            <div className="card-title">Community Comparison</div>
          </div>
        </div>
        {communityChartData &&
          communityChartData.labels && (
            <Chart
              chartData={communityChartData}
              title="Subjects"
              chartType="Pie"
            />
          )}
      </div>
    );
  }
  renderCourseInfo() {
    const { auth } = this.props;
    const { chartData } = this.state;

    return (
      <div className="courseInfo">
        {chartData &&
          chartData.labels && (
            <Chart
              chartData={chartData}
              title={auth.survey[0].name}
              chartType="Bar"
            />
          )}
      </div>
    );
  }
  render() {
    const { auth, allUsers } = this.props;
    const { arrScores } = this.state;
    return (
      <div className="results">
        <div className=" card blue-grey white-text">
          <div className="card-content scores">
            <div className="card-title title">Results</div>
            {auth && auth.submitted && this.renderPercentRight()}
          </div>
        </div>
        {allUsers && this.renderCompareAllUsers()}
        {arrScores && arrScores.length > 0 && this.renderCourseInfo()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    allUsers: state.allUsers
  };
}
export default connect(
  mapStateToProps,
  { fetchAllUsers }
)(Results);
