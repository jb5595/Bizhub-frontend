import React from "react"
import EditTopInfoModal from "../components/ExpertProfileComponents/ExpertProfileModals/editTopInfoModal"
import EditContactInfoModal from  "../components/ExpertProfileComponents/ExpertProfileModals/EditContactInfoModal"
import AddWorkExperienceModal from "../components/ExpertProfileComponents/ExpertProfileModals/AddWorkExperienceModal"
import EditWorkExperienceModal from "../components/ExpertProfileComponents/ExpertProfileModals/EditWorkExperienceModal"
import AddEducationModal from "../components/ExpertProfileComponents/ExpertProfileModals/AddEducationModal"
import EditTagsModal from "../components/ExpertProfileComponents/ExpertProfileModals/EditTagsModal"
import EditEducationModal from "../components/ExpertProfileComponents/ExpertProfileModals/EditEducationModal"
import * as actions from "../actions/expertProfileActions"
import * as sessionActions from "../actions/CurrentUserActions"
import { connect } from "react-redux"

const BaseExpertURL =  process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/experts/"
                                  :"https://pacific-mesa-20126.herokuapp.com/experts/"


class ExpertProfileModalContainer extends React.Component{
  render(){
    return(
      <div>
        {this.renderModal()}
      </div>
    )
  }
  renderModal(){
    switch (this.props.modal) {
      case "topInfo":
        return (<EditTopInfoModal handleEdits = {this.handleTopInfoEdits}
                profile_picture_url = {this.props.expert.profile_picture_url}
                cover_photo_url = {this.props.expert.cover_photo_url}
                handleClose = {this.props.closeModal}
                fullName ={this.props.expert.full_name}
                jobTitle = {this.props.expert.job_title}
                company ={this.props.expert.company}
                about = {this.props.expert.about}/>)

      case "contactInfo":
        return  (<EditContactInfoModal address = {this.props.expert.address}
        city  = {this.props.expert.city} state = {this.props.expert.state}
        phone  = {this.props.expert.phone} email = {this.props.expert.email}
        zipcode = {this.props.expert.zip_code} website  = {this.props.expert.website_url}
        handleClose = {this.props.closeModal} handleEdits = {this.handleEdits}
        />)
      case "tags":
        return (<EditTagsModal handleEdits = {this.handleEdits}
                handleClose = {this.props.closeModal}
                tags = {this.props.expert.tags}/>
              )
      case "addWorkExperience":
        return ( <AddWorkExperienceModal
                  addWorkExperience = {this.addWorkExperience}
                  handleClose = {this.props.closeModal}/>
              )
      case "editWorkExperience":
        return( <EditWorkExperienceModal
                handleEditWorkExperience = {this.handleEditWorkExperience}
                workExperience = {this.props.workExperienceToEdit}
                handleClose = {this.props.closeModal}/>)
      case "addEducation":
        return(<AddEducationModal
                addEducation = {this.addEducation}
                handleClose = {this.props.closeModal}/>

        )
      case "editEducation":
      return( <EditEducationModal
              handleEditEducation = {this.handleEditEducation}
              education = {this.props.educationToEdit}
              handleClose = {this.props.closeModal}/>)
      default:
        return null

    }
  }
// Function to handle sending image data ov
  handleTopInfoEdits = (edits) =>{
    const body = new FormData()
    body.append("full_name", edits.full_name)
    body.append("job_title", edits.job_title)
    body.append("company", edits.company)
    body.append("about", edits.about)
    if (edits.profile_picture){
      body.append("profile_picture", edits.profile_picture)
    }
    if (edits.cover_photo){
      body.append("cover_photo", edits.cover_photo)
    }

    fetch(BaseExpertURL + this.props.currentUser.id,{
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${this.props.jwt}`,
          Accept: "application/json"
        },
        body: body
      }
  ).then(resp => resp.json())
  .then(data =>{

    this.props.UpdateCurrentUser(data)
    this.props.history.push(`/experts/`)
    this.props.history.push(`/experts/${data.id}`)


  })
  }

  handleEdits =(edits) =>{
    console.log(this.props.currentUser.id)
    console.log(edits)
    debugger
    fetch(BaseExpertURL + this.props.currentUser.id,{
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.jwt}`,
          Accept: "application/json"
        },
        body: JSON.stringify(edits)
      }
  ).then(resp => resp.json())
  .then(data =>{
    debugger
    this.props.UpdateCurrentUser(data)
    this.props.history.push(`/experts/`)
    this.props.history.push(`/experts/${data.id}`)


  })

  }

  handleEditWorkExperience = (workExperience) => {
    fetch(BaseExpertURL + `${this.props.currentUser.id}/work_experiences/${workExperience.id}`,{
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.jwt}`,
          Accept: "application/json"
        },
        body: JSON.stringify(workExperience)
      }
    ).then(resp => resp.json())
    .then(data =>{

    this.props.UpdateCurrentUser(data)
    this.props.history.push(`/experts/`)
    this.props.history.push(`/experts/${data.id}`)

    })

  }

  addWorkExperience = (workExperience) =>{

    fetch(BaseExpertURL + `${this.props.currentUser.id}/work_experiences`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.jwt}`,
          Accept: "application/json"
        },
        body: JSON.stringify(workExperience)
      }
  ).then(resp => resp.json())
  .then(data =>{

    this.props.UpdateCurrentUser(data)
    this.props.history.push(`/experts/`)
    this.props.history.push(`/experts/${data.id}`)

    })
  }


  addEducation = (education) =>{
        fetch(BaseExpertURL + `${this.props.currentUser.id}/educations`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.jwt}`,
              Accept: "application/json"
            },
            body: JSON.stringify(education)
          }
      ).then(resp => resp.json())
      .then(data =>{

        this.props.UpdateCurrentUser(data)
        this.props.history.push(`/experts/`)
        this.props.history.push(`/experts/${data.id}`)

        })
      }
      handleEditEducation = (education) => {
        fetch(BaseExpertURL + `${this.props.currentUser.id}/educations/${education.id}`,{
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.jwt}`,
              Accept: "application/json"
            },
            body: JSON.stringify(education)
          }
        ).then(resp => resp.json())
        .then(data =>{

        this.props.UpdateCurrentUser(data)
        this.props.history.push(`/experts/`)
        this.props.history.push(`/experts/${data.id}`)

        })

      }

}



const mapStateToProps = (state) =>{
  return {
          jwt:state.userSession.jwt,
          currentUser:state.userSession.currentUser,
          CurrentUserIsExpert: state.userSession.expert,
          expert: state.expertProfile.expertObject,
          profileLoading: state.expertProfile.profileLoading
        }
}

export default connect(mapStateToProps, {...actions, ...sessionActions })(ExpertProfileModalContainer)
