import React from "react"
import { FaEdit } from "react-icons/fa";
import {IoIosStar } from "react-icons/io";
const uuid = require('uuid/v1');

class ProfileTopInfo extends React.Component{
  render(){
    return(
    <React.Fragment>
    <div className = "row">
      {/* Renders edit button if user is looking at own profile, edit button
      opens modal to edit profile on click  */}
      {this.props.canEdit ?
         <div onClick = {this.props.handleEdit} className = "edit-top-info-button">
            <FaEdit/>
         </div>
        :null}
        <div className = "profile-picture-container">
          <img className = "profile-picture" alt = "profile" src = {this.props.profilePictureUrl}/>
        </div>
        <div className = "profile-header-info">
          <div className = "row">
            <div className = "">
              <span className = "rating">{this.renderRating()}</span>
            </div>
          </div>
          <div className = "row">
            <div className = "profile-name" >
              <h4>{this.props.fullName}</h4>
            </div>
          </div>
          <div className = "row">
            <div className = "profile-subtitle">
              {this.props.jobTitle} @ {this.props.company}
            </div>
          </div>
          </div>
    </div>
    <div className = "row center-text">
      <div className = "offset-2 col-7">
        {this.props.about}
      </div>
    </div>
  </React.Fragment>
  )
}
  renderRating(){
    // Renders Star for each rating point gives unique ID for react
    let stars = []
    for(let i = 0; i < this.props.averageRating; i++){
      stars.push(<IoIosStar key ={uuid()}/>)
    }
    return stars
  }
}


export default ProfileTopInfo
