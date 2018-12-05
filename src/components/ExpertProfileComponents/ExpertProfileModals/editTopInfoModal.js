import React from "react"

import { FaEdit } from "react-icons/fa";


class EditTopInfoModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expert:{
      profile_picture: null,
      cover_photo: null,
      full_name: this.props.fullName,
      job_title: this.props.jobTitle,
      company: this.props.company,
      about: this.props.about
    },
    profile_picture_preview: null,
    cover_photo_preview: null
    }
  }
  render(){
    return(
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal">
      <div className="modal-content" >
        <div className="modal-header">
          <h4>Edit Intro</h4>
        </div>
        <div className="modal-body">
        <form onSubmit = {this.handleSubmit}>
          <img className = "edit-banner-photo-preview" alt = "banner" src = {this.state.cover_photo_preview ? this.state.cover_photo_preview
               :this.props.cover_photo_url}/>
          <div className = "edit-cover-photo-button"> <FaEdit onClick = {() => this.coverInput.click()}/> </div>
          <img className = "profile-picture-edit-preview" alt = "profile"
          src = {this.state.profile_picture_preview ? this.state.profile_picture_preview
             :this.props.profile_picture_url}/>
          <div className = "edit-profile-photo-button"> <FaEdit onClick = {() => this.profileInput.click()}/> </div>
          <input type = 'file' ref ={profileInput => this.profileInput = profileInput}
          onChange = {this.handleProfilePictureSelect} style = {{display: "none"}}/>
          <input type = 'file' ref ={coverInput => this.coverInput = coverInput}
          onChange = {this.handleCoverPhotoSelect} style = {{display: "none"}}/>
          <br/>
          <div className = "edit-top-info-text-inputs">
            <div className="form-group ">
              <label htmlFor="full_name">Full Name</label>
              <input onChange ={this.handleInputChange} type="text" className="form-control" name = "full_name" value = {this.state.expert.full_name} placeholder="Enter Your Full Name"/>
            </div>
            <div className = "row">
              <div className="form-group col-6">
                <label htmlFor="job_title">Job Title</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "job_title" value = {this.state.expert.job_title} placeholder="Current Job Title"/>
              </div>
              <div className="form-group col-6">
                <label htmlFor="company">Company</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "company" value = {this.state.expert.company} placeholder="Company Name"/>
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="about">Headline</label>
              <textarea onChange ={this.handleInputChange} type="text" className="form-control" name = "about" value = {this.state.expert.about} placeholder="Enter Your Headline"/>
            </div>
            <button className = "btn btn-primary">Save Changes</button>
            <br/><br/>
          </div>
          </form>
        </div>
      </div>

      </div>
    )
  }
handleCoverPhotoSelect = (e) =>{
  if (e.target.files[0]){
  this.setState({
    expert:{
      ...this.state.expert,
      cover_photo: e.target.files[0]
    },
    cover_photo_preview: URL.createObjectURL(e.target.files[0])
  })
  }
}


  handleProfilePictureSelect = (e) =>{
    if (e.target.files[0]){
    this.setState({
      expert:{
        ...this.state.expert,
        profile_picture: e.target.files[0]
      },
      profile_picture_preview: URL.createObjectURL(e.target.files[0])
    })
  }

  }
  handleInputChange = (e) =>{
    this.setState({
      expert:{
        ...this.state.expert,
        [e.target.name]: e.target.value
      }
    })
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    this.props.handleEdits(this.state.expert)
  }


}

export default EditTopInfoModal
