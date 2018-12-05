import React from "react"



class EditEducationModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      school: this.props.education.school,
      field_of_study: this.props.education.field_of_study,
      degree: this.props.education.degree,
      start_year: this.props.education.start_year,
      end_year: this.props.education.end_year,
      description: this.props.education.description,
      id: this.props.education.id
    }
  }
  render(){
    return(
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal">
      <div className="modal-content" >
        <div className="modal-header">
          <h4>Edit Education</h4>
        </div>
        <div className="modal-body">
        <form onSubmit = {this.handleSubmit}>
          <br/><br/>
          <div className = "edit-top-info-text-inputs">
              <div className="form-group">
                <label htmlFor="school">School</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "school" value = {this.state.school} placeholder=""/>
              </div>
              <div className="form-group">
                <label htmlFor="field_of_study">Field of Study</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "field_of_study" value = {this.state.field_of_study} placeholder=""/>
              </div>
              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "degree" value = {this.state.degree} placeholder=""/>
              </div>
            <div className = "row">
              <div className="form-group col-3">
                <label htmlFor="start_year">Start Year</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "start_year" value = {this.state.start_year} placeholder=""/>
              </div>
              <div className="form-group col-3">
                <label htmlFor="end_year">End Year</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "end_year" value = {this.state.end_year} placeholder=""/>
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="description">Description</label>
              <textarea onChange ={this.handleInputChange} type="text" className="form-control" name = "description" value = {this.state.description} placeholder="Activities, Societies Etc."/>
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
    this.props.handleEditEducation({education: this.state})
  }


}

export default EditEducationModal
