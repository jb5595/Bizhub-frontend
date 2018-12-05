import React from "react"
import ExpertProfileModalContainer from "./ExpertProfileModalContainer"
import ContactInfo from "../components/ExpertProfileComponents/contactInfo"
import ProfileTopInfo from "../components/ExpertProfileComponents/profileTopInfo"
import AccountAnalyticsOverview from "../components/ExpertProfileComponents/AccountAnalyticsOverview"
import ExpertiseInfo from "../components/ExpertProfileComponents/expertiseInfo"
import ExpertProfileAbout from "../components/ExpertProfileComponents/ExpertProfileAbout"
import ExpertProfileQA from "../components/ExpertProfileComponents/ExpertProfileQ&A"
import ExpertProfileReviews from "../components/ExpertProfileComponents/ExpertProfileReviews"
import { GridLoader } from 'react-spinners';
import { connect } from "react-redux"
import * as actions from "../actions/expertProfileActions"
import * as sessionActions from "../actions/CurrentUserActions"

const BaseExpertURL = "http://localhost:3000/experts/"

class ExpertProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modal: null,
      selectedSubPage: "About",
      canEdit: false,
      workExperienceToEdit: null,
      educationToEdit: null
    }
  }
  componentDidMount(){
    this.props.loadProfile(this.props.id)
    console.log("mounting")

  }
  menuSelector = (e) =>{
    this.setState({
      selectedSubPage: e.target.innerText
    })
   }
   renderEditButtonsifCanEdit(){
     if (this.props.currentUser
       && parseInt(this.props.currentUser.id) === parseInt(this.props.id)
       && this.props.CurrentUserIsExpert && !this.state.canEdit){
         this.setState({canEdit:true})
       }
   }
   componentDidUpdate(){
     this.renderEditButtonsifCanEdit()
   }

  render(){

    if (this.props.profileLoading){
      return (
        <div className = "loading-spinner offset-5">
        <GridLoader
          sizeUnit={"px"}
          size={50}
          color={'#123abc'}
          loading={this.state.profileLoading}
        />
      </div>
    )
    }
    return(
      <div>
        {this.state.modal && this.state.canEdit ? <ExpertProfileModalContainer
                              history ={this.props.history}
                              workExperienceToEdit = {this.state.workExperienceToEdit}
                              closeModal = {this.closeModal}
                              modal = {this.state.modal}
                              educationToEdit = {this.state.educationToEdit}
                              /> : null}
      <div className = "container-fluid">

        <img className = "banner-photo" alt = "banner" src = {this.props.expert.cover_photo_url}/>
          <div className = "expert-profile-container">
          <ProfileTopInfo handleEdit = {this.editTopInfo}
                          fullName ={this.props.expert.full_name}
                          averageRating = {this.props.expert.average_rating}
                          profilePictureUrl = {this.props.expert.profile_picture_url}
                          jobTitle = {this.props.expert.job_title}
                          company ={this.props.expert.company}
                          about = {this.props.expert.about}
                          canEdit = {this.state.canEdit}/>
          <ContactInfo handleEdit = {this.editContactInfo} id = {this.props.expert.id}
                       address = {this.props.expert.address} canEdit = {this.state.canEdit}
                       city  = {this.props.expert.city} state = {this.props.expert.state}
                       phone  = {this.props.expert.phone} email = {this.props.expert.email}
                       zipcode = {this.props.expert.zip_code} website  = {this.props.expert.website_url}/>
         </div>
         <div className = "expert-profile-container">

        {this.props.expert ? <AccountAnalyticsOverview total_upvotes = {this.props.expert.total_upvotes}
                              topTags = {this.props.expert.top_tags}
                              answeredQuestions = {this.props.expert.answered_questions}/>: null}
        <ExpertiseInfo handleEdit = {this.editTags} canEdit = {this.state.canEdit} tags = {this.props.expert.tags}/>
        </div>
        <div className = "row profile-info-menu">
            <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "Reviews" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
              Reviews
            </div>
            <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "About" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
              About
            </div>
            <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "Q&A" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
              Q&A
            </div>
        </div>
        {this.renderSubInformation()}
        <br/><br/> <br/>  <br/>
        </div>
      </div>
    )
  }

  renderSubInformation(){
    switch (this.state.selectedSubPage) {
      case "Reviews":
        return  <div className = "expert-profile-container additional-container-padding">
                  <ExpertProfileReviews history = {this.props.history}
                  expert ={this.props.expert} expert_id = {this.props.expert.id}/>
                 </div>
      case "Q&A":
        return <div className = "expert-profile-container additional-container-padding">
                <ExpertProfileQA history = {this.props.history} questions = {this.props.expert.answered_questions}/>
              </div>
      default:
        return           <div className = "expert-profile-container additional-container-padding">
                                  <ExpertProfileAbout canEdit = {this.state.canEdit}
                                  editWorkExperience = {this.openEditWorkExperiencesModal}
                                  addWorkExperience = {this.openAddWorkExperienceModal}
                                  editEducation = {this.openEditEducationModal}
                                  addEducation = {this.openAddEducationExperienceModal}
                                  educations = {this.props.expert.educations}
                                  workExperience = {this.props.expert.work_experiences}
                                  deleteEducation = {this.deleteEducation}
                                  deleteWorkExperience = {this.deleteWorkExperience}/>
                                </div>

    }
  }

  // Controls for opening and closing Modals
  editTopInfo = (e) =>{
    this.setState({
      modal: "topInfo"
    })
  }
  editContactInfo = (e) =>{
    this.setState({
      modal: "contactInfo"
    })
  }
  editTags = (e)=>{
    this.setState({
      modal: "tags"
    })
  }

  openAddWorkExperienceModal = (e) => {
    this.setState({
      modal: "addWorkExperience"
    })
  }
  openEditWorkExperiencesModal = (work_experience) =>{
    this.setState({
      modal: "editWorkExperience",
      workExperienceToEdit: work_experience

    })
  }
  openAddEducationExperienceModal = (e) => {
    this.setState({
      modal: "addEducation",
    })
  }
  openEditEducationModal = (education) =>{
    this.setState({
      modal: "editEducation",
      educationToEdit: education

    })
  }


  closeModal = (e) =>{
    if (e.target.id === "closeModal"){
      this.setState({
        modal: null,
        workExperienceToEdit: null,
        educationToEdit: null
      })
    }
  }

  deleteWorkExperience = (workExperienceId) =>{
    fetch(BaseExpertURL + `${this.props.currentUser.id}/work_experiences/${workExperienceId}`,{
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${this.props.jwt}`,
        }
      }
    ).then(resp => resp.json())
    .then(data =>{

    this.props.UpdateCurrentUser(data)
    this.props.history.push(`/experts/`)
    this.props.history.push(`/experts/${data.id}`)

    })
  }
  deleteEducation = (educationId) => {
    fetch(BaseExpertURL + `${this.props.currentUser.id}/educations/${educationId}`,{
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${this.props.jwt}`,
        }
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

export default connect(mapStateToProps, {...actions, ...sessionActions })(ExpertProfile)
