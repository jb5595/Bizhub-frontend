
import React from 'react'
import {connect} from "react-redux"
import AnswerUpvoteContainer from "../containers/AnswerUpvoteContainer"
// const AnswerURL = process.env["NODE_ENV"] === "development" ?
//                                       "http://localhost:3000/answers/"
//                                      :"https://pacific-mesa-20126.herokuapp.com/answers/"
const AnswerURL = "https://pacific-mesa-20126.herokuapp.com/answers/"
class AnswerDisplay extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      upvotes:null,
      upvoteScore: null
    }
  }
  componentDidMount(){
    this.loadUpvotes()
  }

  loadUpvotes = () =>{
    fetch(AnswerURL + `/${this.props.answerId}/answer_upvotes`)
    .then(resp => resp.json())
    .then(data => this.setState({
      upvotes:data.upvotes,
      upvoteScore: data.upvoteScore
    }))
  }
  render(){

    return(
      <div>
        <div className = "question-preview">
        <div className = "row">
          <div className = "answer-display-content">
            <p>{this.props.content}</p>
            {this.state.upvotes && this.props.currentUser ?
               <AnswerUpvoteContainer
                  answerId= {this.props.answerId} questionId = {this.props.questionId}
                  upvotes = {this.state.upvotes} reloadUpvotes = {this.loadUpvotes}
                  upvoteScore = {this.state.upvoteScore}/>
              : null}
            <div className = "offset-0 offset-lg-6 row">
              <div className ="col-1 col-lg-2">
                <img className = "profile-picture-thumbnail" alt = "profile" src = {this.props.expert.profile_picture_url}/>
              </div>
              <div className = "expert-preview-details col-9">
                <p onClick = {() => this.props.handleClick(this.props.expert.id)}>
                  <span className = "expert-preview-name"><b>{this.props.expert.full_name}</b></span>
                </p>
                <p className = "expert-preview-tagline">{this.props.expert.about}</p>
                <p className = "expert-preview-tagline">{this.props.expert.job_title} @ {this.props.expert.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    currentUser: state.userSession.currentUser,
    currentUserLoading: state.userSession.currentUserLoading,
    question: state.questionShow.questionObject,
    questionLoading: state.questionShow.questionLoading
  }
}

export default connect(mapStateToProps)(AnswerDisplay)
