import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

class SuggestedQuestions extends React.Component{
  render(){
    return(
        <div className = "analytics">
          <h4>Suggested Questions</h4>
          <div className = "profile_views ">
            <p>We suggest questions that match your expertise that can help you get the most exposure and inquiries.</p>
            <div className = "dashboard-question-preview">
              <QuestionDisplayContainer history = {this.props.history} questions ={this.props.questions}/>
            </div>
          </div>
        </div>
    )
  }
}

export default SuggestedQuestions
