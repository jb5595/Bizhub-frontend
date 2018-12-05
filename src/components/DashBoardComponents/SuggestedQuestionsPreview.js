import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

class SuggestedQuestionsPreview extends React.Component{
  render(){
    return(
      <div>
        <div className = "analytics">
        <h4>Suggested Questions</h4>
          <div className = "profile_views ">
            <p>We suggest questions that match your expertise that can help you get the most exposure and inquiries.</p>

          <div className = "dashboard-question-preview">
          <QuestionDisplayContainer history = {this.props.history} questions ={this.props.questions}/>
            <div onClick ={this.props.handleClick} className = "view-all-answers-button">
              View All Suggested Questions
            </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}

export default SuggestedQuestionsPreview
