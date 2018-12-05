import React from "react"
import { GridLoader } from 'react-spinners';
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";


class ExpertProfileAbout extends React.Component{
  render(){
    return(
      <div className = "profile-subinfo">
          <h5 className = "offset-2 col-8">Work Experience
            {this.props.canEdit ? <span onClick = {this.props.addWorkExperience}
            className = "add-work-experience-button">
                <FaPlusSquare/>
            </span>:null}</h5>
          <div className= "work-experience-container">
            {this.props.workExperience ? this.renderWorkExperience() :  <GridLoader sizeUnit={"px"} size={50} color={'#123abc'} loading={this.props.workExperience}/>}
          </div>
          <h5 className = "offset-2 col-8">Education
           {this.props.canEdit ? <span onClick = {this.props.addEducation}
           className = "add-work-experience-button">
            <FaPlusSquare/></span> :null}</h5>
          <div className= "work-experience-container">
            {this.props.educations ? this.renderEducation() :  <GridLoader sizeUnit={"px"} size={50} color={'#123abc'} loading={this.props.educations}/>}
          </div>
      </div>
    )
    }

    renderWorkExperience(){
      return this.props.workExperience.map(job =>{
      return(
        <div key={job.id} className = "offset-2 col-8">
          {this.props.canEdit ?  <div  className = "work-experiences-buttons">
              <span className = "edit-work-experiences-button" data-id ={job.id} onClick = {this.handleEditWorkExperience}>
                <FaEdit/>
              </span>
              <span data-id = {job.id} onClick = {this.handleDeleteWorkExperience}>
                <FaTrash/>
              </span>
            </div>: null }

            <h5 className = "job-title">{job.title}</h5>
            <div className = "company">{job.company}</div>
            <div className = "work-dates">{job.start_month} {job.start_year} - {job.end_month && job.end_year ? `${job.end_month} ${job.end_year}` : "Present"}</div>
            <div className = "location">{job.location}</div>
            <div className = "description">{job.description}</div>
        </div>
      )
    })
    }
    handleEditWorkExperience = (e) => {
      let workExperience = this.props.workExperience.find(job => job.id == e.currentTarget.dataset.id)
      this.props.editWorkExperience(workExperience)
    }
    handleDeleteWorkExperience = (e) =>{
      this.props.deleteWorkExperience(e.currentTarget.dataset.id)
    }
    renderEducation(){
      return this.props.educations.map(education => {
        return(
          <div key={education.id} className = "offset-2 col-8">
              {this.props.canEdit ?  <div  className = "work-experiences-buttons">
                  <span className = "edit-work-experiences-button" data-id ={education.id} onClick = {this.handleEditEducation}>
                    <FaEdit/>
                  </span>
                  <span data-id = {education.id} onClick = {this.handleDeleteEducation}>
                    <FaTrash/>
                  </span>
                </div>: null }
              <h5 className = "job-title">{education.school}</h5>
              <div className = "company">{education.degree}, {education.field_of_study}</div>
              <div className = "work-dates">{education.start_year} - {education.end_year ? `${education.end_year}` : "Present"}</div>
              <div className = "description">{education.description}</div>
          </div>

        )
      })
    }
    handleEditEducation = (e) => {
      let education = this.props.educations.find(education => education.id == e.currentTarget.dataset.id)
      this.props.editEducation(education)
    }

    handleDeleteEducation = (e) =>{
      this.props.deleteEducation(e.currentTarget.dataset.id)
    }
}


export default ExpertProfileAbout
