import React from "react"



class AddWorkExperienceModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      job_title: "",
      company: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      location: "",
      description: ""
    }
  }
  render(){
    return(
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal">
      <div className="modal-content" >
        <div className="modal-header">
          <h4>Add Work Experience</h4>
        </div>
        <div className="modal-body">
        <form onSubmit = {this.handleSubmit}>
          <br/><br/>
          <div className = "edit-top-info-text-inputs">
            <div className = "row">
              <div className="form-group col-6 ">
                <label htmlFor="job_title">Title</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "job_title" value = {this.state.job_title} placeholder=""/>
              </div>
              <div className="form-group col-6 ">
                <label htmlFor="company">Company</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "company" value = {this.state.company} placeholder=""/>
              </div>
            </div>
            <label>Start Date</label>
            <div className = "row">
              <div className="form-group col-3">
                <label htmlFor="start_month">Month</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "start_month" value = {this.state.start_month} placeholder=""/>
              </div>
              <div className="form-group col-3">
                <label htmlFor="start_year">Year</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "start_year" value = {this.state.start_year} placeholder=""/>
              </div>
            </div>
            <label>End Date</label>
            <div className = "row">
              <div className="form-group col-3">
                <label htmlFor="end_month">Month</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "end_month" value = {this.state.end_month} placeholder=""/>
              </div>
              <div className="form-group col-3">
                <label htmlFor="end_year">Year</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "end_year" value = {this.state.end_year} placeholder=""/>
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="location">Location</label>
              <input onChange ={this.handleInputChange} type="text" className="form-control col-6" name = "location" value = {this.state.location} placeholder="ex: Washington, DC"/>
            </div>
            <div className="form-group ">
              <label htmlFor="description">Description</label>
              <textarea onChange ={this.handleInputChange} type="text" className="form-control" name = "description" value = {this.state.description} placeholder=""/>
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
  handleInputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    this.props.addWorkExperience({work_experience: this.state})
  }


}

export default AddWorkExperienceModal
