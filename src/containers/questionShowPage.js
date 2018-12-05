import React from "react"
import QuestionDisplay from "../components/QuestionDisplay"
import * as actions from "../actions/questionShowPageActions"
import { connect } from "react-redux"
import AnswerContainer from "./AnswerContainer"
import AnswerForm from "../components/AnswerForm"
class QuestionShowPage extends React.Component{


  componentDidMount(){
    this.props.loadQuestion(this.props.id)
    this.props.loadUpvotes(this.props.id)

  }
  render(){
    this.reloadQuestionIfNeeded()
    return(
      <div className = "col-8 offset-2">
         {this.props.questionLoading || this.currentUserLoading ? null : <QuestionDisplay
        id = {this.props.id}
        history = {this.props.history}
        question = {this.props.question.question}
        details = {this.props.question.question_details}
        tags = {this.props.question.tags}
        user = {this.props.question.user}
        />}
        <AnswerContainer
        questionId ={this.props.id}
        history = {this.props.history}
        answers = {this.props.question.answers}/>
        {this.props.currentUserIsExpert ? <AnswerForm
            reloadQuestion = {this.reloadQuestionIfNeeded} jwt = {this.props.jwt}
           expertId = {this.props.currentUser.id} questionId = {this.props.question.id}/>: null}
      </div>
    )
  }
  reloadQuestionIfNeeded = (forceReload = false) =>{
    if (forceReload || parseInt(this.props.question.id) !== parseInt(this.props.id) ){
      this.props.loadQuestion(this.props.id)
    }
  }
}

const mapStateToProps = (state) =>{
  return{
    jwt:state.userSession.jwt,
    currentUser:state.userSession.currentUser,
    currentUserIsExpert: state.userSession.expert,
    currentUserLoading: state.userSession.currentUserLoading,
    question: state.questionShow.questionObject,
    questionLoading: state.questionShow.questionLoading
  }
}

export default connect(mapStateToProps, actions)(QuestionShowPage)
