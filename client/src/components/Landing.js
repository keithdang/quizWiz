import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { selectSurvey, fetchAllSurveys, submitSurvey } from "../actions";
import { Link } from "react-router-dom";
class Landing extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showQuestions: false,
      surveyChosen: null,
      surveyToSubmit: null,
      surveySubmit: null
    };
    this.renderSubjects = this.renderSubjects.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
    this.submitSet = this.submitSet.bind(this);
    this.finalSubmitSet = this.finalSubmitSet.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllSurveys();
  }
  getSurvey(survey) {
    const { selectSurvey } = this.props;
    selectSurvey(survey);
    this.submitSet(survey);
    this.setState({ surveyChosen: survey, showQuestions: true });
  }
  pickAnswer(option, question) {
    let tmpAnswer = false;
    if (option === question.answer) {
      tmpAnswer = true;
    }
    let newSurvey = this.state.surveySubmit;
    newSurvey[question.question] = { chosen: option, correct: tmpAnswer };

    this.setState({ surveySubmit: newSurvey });
  }
  submitSet(survey) {
    var tmpArr = [];
    var tmpMap = {};
    survey.questions.forEach(element => {
      tmpArr.push({ question: element.question, chosen: "", correct: false });
      tmpMap[element.question] = { chosen: "", correct: false };
    });
    this.setState({ surveyToSubmit: tmpArr, surveySubmit: tmpMap });
  }
  finalSubmitSet() {
    const { surveySubmit } = this.state;
    var tmpSurvey = [];
    Object.keys(surveySubmit).forEach(function(key) {
      tmpSurvey.push({
        question: key,
        chosen: surveySubmit[key].chosen,
        correct: surveySubmit[key].correct
      });
    });
    this.props.submitSurvey(tmpSurvey);
  }
  renderGoSignUp() {
    return (
      <div>
        <h1>Welcome!</h1>
        To do the quiz, you'll need to sign in through google!
      </div>
    );
  }
  renderQuestion(question, index) {
    const { surveySubmit } = this.state;
    return (
      <div key={question.question}>
        <h5>
          {index}.{question.question}?
        </h5>
        <div className="choices">
          {_.map(question.options, option => {
            return (
              <Button
                key={option}
                onClick={() => this.pickAnswer(option, question)}
                className={
                  surveySubmit &&
                  surveySubmit[question.question] &&
                  surveySubmit[question.question].chosen === option
                    ? "question"
                    : "chosen"
                }
              >
                {option}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
  renderQuestionList() {
    const { auth } = this.props;
    let count = 0;
    return (
      <div>
        {auth && auth.survey && auth.survey[0] && auth.survey[0].name ? (
          <div>
            <h2>{auth.survey[0].name}</h2>
            {_.map(auth.survey[0].questions, question => {
              count++;
              return this.renderQuestion(question, count);
            })}
            <Link to="/results">
              <Button
                style={{ marginTop: "10px" }}
                onClick={() => this.finalSubmitSet()}
              >
                Submit
              </Button>
            </Link>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
  renderSubjects() {
    const { allSurveys } = this.props;
    const { showQuestions } = this.state;
    if (showQuestions) {
      return this.renderQuestionList();
    } else {
      return (
        <div>
          <h2>Course Options</h2>
          <div className="subjects">
            {_.map(allSurveys, survey => {
              return (
                <div key={survey.name}>
                  <Button
                    className="start"
                    onClick={() => this.getSurvey(survey)}
                  >
                    {survey.name}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
  render() {
    const { auth, allSurveys } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        {auth && allSurveys ? this.renderSubjects() : this.renderGoSignUp()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    allSurveys: state.allSurveys
  };
}
export default connect(
  mapStateToProps,
  {
    selectSurvey,
    fetchAllSurveys,
    submitSurvey
  }
)(Landing);
