import React from "react"
import TagForm from "../components/TagForm"
import { connect } from "react-redux"


const QuestionURL = "http://localhost:3000/questions/"

class PostQuestionPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      question:{
        user_id: this.props.currentUser ? this.props.currentUser.id : null ,
        question: "",
        question_details: "",
        tags:[]
      }

    }
  }

  addTag = (tagName) =>{
    this.setState({
      question:{
        ...this.state.question,
        tags:[...this.state.question.tags, tagName]
      }

    })
  }

  removeTag = (tagName) =>{
    let newTags = this.state.question.tags.filter(tag => tag !== tagName )
    this.setState({
      question:{
        ...this.state.question,
        tags: newTags
      }
    })
  }
  render(){
    return(
      <div>
        <div className = "form-container col-6 offset-3">
          <div className="form-group">
            <label htmlFor="question"><b>Title</b></label>
            <input onChange ={this.handleChange} type="text"  maxLength = "150" className="form-control" name = "question" placeholder="Be as clear and concise as possible"/>
            <small className="form-text text-muted">Max 150 characters</small>
          </div>
          <div className="form-group">
            <label htmlFor="question_details"><b>Question Details</b></label>
            <textarea onChange ={this.handleChange} className="form-control" rows="4"
            name = "question_details" placeholder = "Provide as many details as possible, this will help experts provide the best answers">
            </textarea>
          </div>
          <TagForm tags = {this.state.question.tags} addTag = {this.addTag} removeTag = {this.removeTag}/>
          <br/>
          <button onClick ={this.postQuestion} className = "btn btn-primary">Post Your Question</button>
        </div>
      </div>
    )
  }
  handleChange = (e) =>{
    this.setState({
      question:{
        ...this.state.question,
        [e.target.name]: e.target.value
      }

    })
  }
  postQuestion = () =>{
    let body = {question:this.state.question}

    fetch(QuestionURL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.jwt}`,
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    }
).then(resp => resp.json())
.then(data => {
  
  this.props.history.push(`/questions/${data.id}`)})
  }
}

const mapStateToProps = (state)=>{
  return {
    currentUser:state.userSession.currentUser,
    jwt: state.userSession.jwt
  }
}


export default connect(mapStateToProps, null)(PostQuestionPage)
