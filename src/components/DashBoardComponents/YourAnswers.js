import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

class YourAnswers extends React.Component{
  constructor(props){
    super(props)
    if(this.props.answers_overview.answers_last_month ===0){
      if(this.props.answers_overview.answers_this_month >0){
        this.state = {
          answerPercentDifference: 100.0
        }
      }
      else {
        this.state = {
          answerPercentDifference: 0.0
        }
      }
    }
    else{
      this.state = {
        answerPercentDifference: ((this.props.answers_overview.answers_this_month-this.props.answers_overview.answers_last_month)/this.props.answers_overview.answers_last_month).toFixed(2),

      }
    }
  }

  render(){
    return(
      <div>
        <div className = "analytics">
        <h4>Your Answers</h4>
          <div className = "profile_views ">
            <p>Get more profile views by answering questions.</p>
            <br/>
            <div className = "dashboard-container additional-container-padding">
              <div className = "row offset-1">
                <div className = "analytics-header">
                  <div>
                    <b>Total Answers</b>
                  </div>
                  <div>
                    {this.props.answers_overview.total_answers}
                  </div>
                </div>
                <div className = "analytics-header">
                  <div>
                    <b>Answers This Month</b>
                  </div>
                  <div>
                  {this.props.answers_overview.answers_this_month}
                  </div>
                  {this.state.answerPercentDifference > 0.0 ? <small className = "increase">+{this.state.answerPercentDifference}%</small> : <small className = "decrease">({this.state.answerPercentDifference}%)</small> }
                </div>
                <div className = "analytics-header">
                  <div>
                    <b>Answers Last Month</b>
                  </div>
                  <div>
                  {this.props.answers_overview.answers_last_month}
                  </div>
                </div>
                </div>
              </div>
            <div className = "dashboard-question-preview">
            <QuestionDisplayContainer history = {this.props.history} questions ={this.props.questions}/>
            </div>
          </div>

        </div>
      </div>
    )
  }

}

export default YourAnswers
