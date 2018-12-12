import React from "react"
import UserProfileTopInfo from "../components/UserProfileComponents/UserProfileTopInfo"
import UserProfileQuestionsContainer from "./UserProfileQuestionsContainer"
import { connect } from "react-redux"
import EditUserInfoModal from "../components/UserProfileComponents/EditUserInfoModal"
import * as actions from "../actions/userActions"
import * as sessionActions from "../actions/CurrentUserActions"

const UserUrl = process.env["NODE_ENV"] === "development" ?
                                 "http://localhost:3000/users/"
                                 :"https://pacific-mesa-20126.herokuapp.com/users/"
class UserProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modal: false
    }
  }


  componentDidMount(){
    this.props.loadUserProfile(this.props.id)
  }
  render(){
    return(
      <div>
        {this.state.modal ? <EditUserInfoModal handleSubmit = {this.editUser} email = {this.props.user.email}
          sizeRange = {this.props.user.size_range} location = {this.props.user.location}
          industry = {this.props.user.industry} handleClose = {this.closeModal}/> : null}
        {!this.props.user ||this.props.profileLoading ||this.props.currentUserLoading ? null :
        <UserProfileTopInfo userName = {this.props.user.user_name}
        industry = {this.props.user.industry} handleModal = {this.openEditProfileModal}
        numberOfQuestions = {this.props.user.number_of_questions}
        email = {this.props.user.email}
        sizeRange = {this.props.user.size_range} location = {this.props.user.location}/>}
        {!this.props.user || this.props.profileLoading? null : <UserProfileQuestionsContainer history ={this.props.history} userID = {this.props.user.id}/> }
      </div>
    )

}
editUser = (edits)=>{

  fetch(UserUrl + `${this.props.currentUser.id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.jwt}`,
        Accept: "application/json"
      },
      body: JSON.stringify({user:edits})
    }
  ).then(resp => resp.json())
  .then(data =>{

  this.props.UpdateCurrentUser(data)
  this.props.history.push(`/`)
  this.props.history.push(`/users/${data.id}`)
  })
}
closeModal = (e) =>{
  if (e.target.id === "closeModal"){
    this.setState({
      modal:false
    })
  }

}
openEditProfileModal = () =>{
  this.setState({
    modal:true
  })
}

}

const mapStateToProps = (state) =>{
  return {
          jwt: state.userSession.jwt,
          user: state.userProfile.userObject,
          profileLoading: state.userProfile.userLoading,
          currentUser:state.userSession.currentUser,
          currentUserLoading: state.userSession.loadingCurrentUser,
          currentUserIsExpert: state.userSession.expert,        }
}


export default connect(mapStateToProps, {...actions, ...sessionActions})(UserProfile)
