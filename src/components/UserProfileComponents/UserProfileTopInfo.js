import React from "react"
import { IoIosPeople } from "react-icons/io";
import {  FaEdit, FaQuestion, FaMapMarkedAlt, FaIndustry } from "react-icons/fa";
import {connect } from 'react-redux'

class UserProfileTopInfo extends React.Component{
  constructor(props){
    super(props)
    let canEdit
    if (this.props.currentUser && this.props.currentUser.id === this.props.user.id && !this.props.currentUserIsExpert){
      canEdit = true
    }
    else{
      canEdit =false
    }
    this.state  = {
      canEdit: canEdit
    }
  }

  render(){
    return(
      <div className = "user-profile-top-info-container offset-2 col-8">
      <div className = "row">
      {this.state.canEdit ? <div onClick = {this.props.handleModal} className = "edit-top-info-button">
        <FaEdit/>
      </div>:null}
        <div className = "user-profile-picture-container ">
          <img className = "user-profile-picture" alt = "profile" src = "https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com"/>
        </div>
        <div className = "user-profile-header-info">
          <div className = "row">
            <div className = "profile-name" >
              <h4>{this.props.userName}</h4>
            </div>
          </div>
          <div className = "row">
            <div className = "profile-subtitle">
              <IoIosPeople/> {this.props.sizeRange} Employees
            </div>
          </div>
          <div className = "row">
            <div className = "profile-subtitle">
              <FaMapMarkedAlt/> {this.props.location}
            </div>
          </div>
          <div className = "row">
            <div className = "profile-subtitle">
              <FaIndustry/> Industries: {this.props.industry}
            </div>
          </div>
          <div className = "row">
            <div className = "profile-subtitle">
              <FaQuestion/>{this.props.numberOfQuestions} Questions
            </div>
          </div>
        </div>

      </div>


      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return {
          user: state.userProfile.userObject,
          profileLoading: state.userProfile.userLoading,
          currentUser:state.userSession.currentUser,
          currentUserIsExpert: state.userSession.expert,        }
}


export default connect(mapStateToProps)(UserProfileTopInfo)
