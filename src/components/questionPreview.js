import React from 'react'
import { FaArrowAltCircleUp, FaUserAlt, FaIndustry } from "react-icons/fa";

class QuestionPreview extends React.Component{

  render(){

    return(
    <div className = "question-preview">
      <h5 onClick ={this.handleClick}>
      <span className = "question-preview-header">{this.props.question}</span>
      </h5>
      <p>{this.props.details.slice(0,140)}...</p>
      <div>
        {this.props.user ?
          <div>
            <small>
              <FaArrowAltCircleUp/> {this.props.upvote_score}
           </small>
           <small className ="username-preview" onClick = {this.reRoutetoUserPage}>
            <FaUserAlt/>   {this.props.user.user_name}
           </small>
           <small>
            <FaIndustry/>   {this.props.user.industry}
           </small>
       </div>
     :null}
      </div>
      {this.props.tags?
        this.props.tags.map(tag =>
          <div key = {tag.id} className = "expertise-tag">{tag.name}</div>)
        : null}
    </div>
    )
  }
  reRoutetoUserPage = ()=>{
    this.props.history.push(`/users/${this.props.user.id}`)
  }


  handleClick = () =>{
    this.props.history.push(`/questions/${this.props.id}`)
  }
}

export default QuestionPreview
