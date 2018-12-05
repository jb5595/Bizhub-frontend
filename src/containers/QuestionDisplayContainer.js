import React from "react"
import QuestionPreview from "../components/questionPreview"
const uuid = require('uuid/v1');

class QuestionDisplayContainer extends React.Component {

  render(){
    return(
      <div>
        {this.props.questions.map(question => <QuestionPreview
        key = {uuid()}
        id = {question.id}
        history = {this.props.history}
        question = {question.question}
        user = {question.user}
        upvote_score = {question.upvote_score}
        details = {question.question_details}
        tags = {question.tags} /> )  }
      </div>

    )
  }
}
export default QuestionDisplayContainer
