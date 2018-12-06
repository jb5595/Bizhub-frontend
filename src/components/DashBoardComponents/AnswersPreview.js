import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

class AnswersPreview extends React.Component{
  constructor(props){
    super(props)

    // Prevents a divide by 0 error
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
    /*
      Calculates percentage difference for
     PercentDif = (Amount this month - Amount Last Month)/(Amount Last Month)
    */
    else{
      this.state = {
        answerPercentDifference: ((this.props.answers_overview.answers_last_month/(this.props.answers_overview.answers_this_month-this.props.answers_overview.answers_last_month))*100).toFixed(2),

      }
    }
  }
  render(){
    return(
      <div className = "analytics">
        <h4>Your Answers</h4>
        <div className = "profile_views ">
          <p>Get more profile views by answering questions.</p>
          <br/>
          <div className = "dashboard-container additional-container-padding">
            <div className = "row offset-1">
            <br/><br/>
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
              {/* Conditionaly Renders Positive Change in Green Text and negative in red */}
              {this.state.answerPercentDifference > 0.0 ?
                 <small className = "increase">+{this.state.answerPercentDifference}%</small> :
                 <small className = "decrease">({this.state.answerPercentDifference}%)</small> }
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
          <br/><br/>
          </div>
          <div className = "dashboard-question-preview">
            <QuestionDisplayContainer history = {this.props.history} questions ={this.props.questions}/>
            <div onClick ={this.props.handleClick} className = "view-all-answers-button">
              View All Answers
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default AnswersPreview
