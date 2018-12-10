
import React from "react"
import {IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io"
import * as actions from "../actions/questionShowPageActions"
import { connect } from "react-redux"


// const UpvoteUrl = process.env["NODE_ENV"] === "development" ?
//                                  "http://localhost:3000/question_upvotes/"
//                                  :"https://pacific-mesa-20126.herokuapp.com/question_upvotes/"

const UpvoteUrl = "https://pacific-mesa-20126.herokuapp.com/question_upvotes/"

class QuestionUpvoteContainer extends React.Component {
  constructor(props){
    super(props)
    let hasUpvoted = this.hasUpvoted()
    this.state = {
      hasUpvoted:hasUpvoted
    }
  }
  render(){
    return(
      <div className = "vote-container">
      <div>
      <IoMdArrowDropupCircle data-type = "upvote" onClick = {this.handleVote} className ={this.state.hasUpvoted === "upvote" ?"active-upvote-icon" :"upvote-icon"} />
      <span className = "vote-score">{this.props.upvoteScore}</span>
      <IoMdArrowDropdownCircle data-type = "downvote" onClick = {this.handleVote} className ={this.state.hasUpvoted === "downvote" ?"active-upvote-icon" :"upvote-icon"}/>
      </div>
      </div>
    )
  }

  handleVote = (e) =>{
    if (this.props.currentUser){
    let score = e.currentTarget.dataset.type ==="upvote" ? 1 :-1;
    let body = {
      score: score,
      question_id: this.props.question_id,
      upvoter_id: this.props.currentUser.id,
      upvoter_type: this.props.currentUserIsExpert ? "Expert" : "User"
    }
    fetch(UpvoteUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.jwt}`,
          Accept: "application/json"
          },
      body: JSON.stringify(body)
        })
    .then(resp => resp.json())
    .then(data => {
      this.props.loadUpvotes(this.props.question_id)
    })

  }
}

  hasUpvoted(){
    // if the current user is an expert check for matching upvote of type "expert"
    if ((this.props.currentUser && this.props.currentUserIsExpert &&
      this.props.upvotes.find(upvote => upvote.upvoter_id === this.props.currentUser.id && upvote.upvoter_type === "Expert"))
    ){
      // Check whether upvote or down vote
      if(this.props.upvotes.find(upvote => upvote.upvoter_type === "Expert" && upvote.upvoter_id === this.props.currentUser.id).score === 1){
        return "upvote"
      }
      else{
        return "downvote"
      }
    }
    // if current expert is user check for matching upvote of type "user"
      else if ((this.props.currentUser && !this.props.currentUserIsExpert &&
        this.props.upvotes.find(upvote => upvote.upvoter_id === this.props.currentUser.id && upvote.upvoter_type === "User"))) {
          if(this.props.upvotes.find(upvote => upvote.upvoter_type === "User" && upvote.upvoter_id === this.props.currentUser.id).score === 1){
            return "upvote"
          }
          else{
            return "downvote"
          }
      }

    else{
      return false
    }
  }
}

const mapStateToProps = (state) =>{
  return{
    upvotes: state.questionShow.upvotes,
    upvoteScore: state.questionShow.upvoteScore,
    jwt:state.userSession.jwt,
    currentUser:state.userSession.currentUser,
    currentUserIsExpert: state.userSession.expert,
  }
}

export default connect(mapStateToProps, actions)(QuestionUpvoteContainer)
