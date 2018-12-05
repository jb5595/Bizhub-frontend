import React from "react"
import AnswerDisplay from "../components/AnswerDisplay"

class AnswerContainer extends React.Component{
  render(){
    return(
      <div className = "answer-container">
        <h5>Answers</h5>
        {this.props.answers ? this.renderAnswers() : null}
      </div>
    )
  }
  renderAnswers(){
    if (this.props.answers.length > 0){
    return this.props.answers.map(answer =>
      <AnswerDisplay 
      upvoteScore = {answer.upvote_score}
      answerId = {answer.id}
      questionId = {this.props.questionId}
      key = {answer.id} content = {answer.content}
      upvotes = {answer.answer_upvotes} expert = {answer.expert}
      handleClick = {this.reRouteToExpertPage}/>)
    }
    else {
      return <div>There aren't any answers for this question yet!</div>
    }

  }
  reRouteToExpertPage = (expertId) =>{
    this.props.history.push(`/experts/${expertId}`)
  }
}

export default AnswerContainer
