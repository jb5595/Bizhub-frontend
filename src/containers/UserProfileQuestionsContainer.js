import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions/userActions"
import { GridLoader } from 'react-spinners';
import QuestionPreview from "../components/questionPreview"
import { Link } from 'react-router-dom';

class UserProfileQuestionsContainer extends React.Component{
  componentDidMount(){
    this.props.loadUserQuestions(this.props.userID)


  }
  render(){
    return(
      <div className = "questions-container">
        <h5>Questions</h5>
        <div className = "col-8 offset-2">
        {this.props.questions ? this.renderQuestions():<div style = {{marginLeft:"45vw"}}><GridLoader sizeUnit={"px"} size={25} color={'#123abc'} loading={true}/></div>}
        </div>
      </div>
    )
  }
  renderQuestions(){
    if (this.props.questions.length === 0){
      return this.noQuestionsRender()
    }
    else{
    return this.props.questions.map(question =>
       <QuestionPreview key ={question.id} user = {this.props.user} question = {question.question}
        details = {question.question_details} history = {this.props.history}
        upvote_score = {question.upvote_score}
         id = {question.id}/>)
       }
     }

   noQuestionsRender(){
    if (this.props.currentUser.id === this.props.user.id && !this.props.currentUserIsExpert){
      return(
        <div>No questions yet! <Link className = "homepage-link" to = 'http://localhost:3001/questions'>Browse questions</Link> other users have asked or <Link className = "homepage-link" to = "/post/question"> post your own </Link> </div>
      )
    }else{
      return(
        <div>No questions yet! <Link className = "homepage-link" to = 'http://localhost:3001/questions'> Browse questions </Link> other users have asked</div>
      )
    }

   }

  }

const mapStateToProps = (state) =>{
  return {
    user: state.userProfile.userObject,
    currentUser:state.userSession.currentUser,
    currentUserIsExpert: state.userSession.expert,
    questions:state.userProfile.userQuestions,
    questionsLoading: state.userProfile.questionsLoading
  }
}

export default connect(mapStateToProps, actions )(UserProfileQuestionsContainer)
