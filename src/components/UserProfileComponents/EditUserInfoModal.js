import React from 'react'

class EditUserInfoModal extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      user: {
        email: this.props.email,
        size_range: this.props.size_range,
        location: this.props.location,
        industry: this.props.industry
      },
      errors: null
    }

  }
  render(){
    return(
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal">

      <div className="modal-content" >

        <div className="modal-header">

          <h4>Edit Info</h4>

        </div>

        <div className="modal-body">
        <form onSubmit = {this.editUser} className = "form-container col-6 offset-3">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input value = {this.state.user.email} onChange = {this.handleChange} type="email" className="form-control" name = "email" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Location</label>
          <input value = {this.state.user.location}  onChange = {this.handleChange} type="text" name = "location" className="form-control" placeholder="ex: Washington, DC"/>
        </div>
      <div className="form-group">
          <label htmlFor="industry">Industry(s)</label>
          <input value = {this.state.user.industry}  onChange = {this.handleChange} type="text" name = "industry" className="form-control" placeholder="ex: Manufacturing, Retail"/>
        </div>
      <div className="form-group">
          <label htmlFor="size-range">Size Range</label>
          <select value = {this.state.user.size_range} onChange = {this.handleChange} className="form-control" name = "size_range">
            <option>{'1-25'}</option>
            <option>{'25-75'}</option>
            <option>{"75-150"}</option>
            <option>{"150-500"}</option>
            <option>{"500+"}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <br/><br/>
        </form>

        </div>
        </div>
      </div>

    )
  }
  editUser = (e) =>{
    e.preventDefault()
    this.props.handleSubmit(this.state.user)
  }
  handleChange = (e) =>{
    this.setState({
      user:{
        ...this.state.user,
        [e.target.name]:e.target.value
      }
    })
  }
}

export default EditUserInfoModal
