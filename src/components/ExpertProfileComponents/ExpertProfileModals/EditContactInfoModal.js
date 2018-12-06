import React from "react"



class EditContactInfoModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      website_url: this.props.website,
      phone: this.props.phone,
      address: this.props.address,
      email: this.props.email,
      city: this.props.city,
      state: this.props.state,
      zip_code: this.props.zipcode
    }
  }
  render(){
    return(
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal">
      <div className="modal-content" >
        <div className="modal-header">
          <h4>Edit Contact Info</h4>
        </div>
        <div className="modal-body">
        <form onSubmit = {this.handleSubmit}>
          <br/><br/>
          <div className = "edit-top-info-text-inputs">
            <div className = "row">
              <div className="form-group col-6 ">
                <label htmlFor="website_url">Website</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "website_url" value = {this.state.website_url} placeholder="Enter Your Website Url"/>
              </div>
              <div className="form-group col-6 ">
                <label htmlFor="phone">Phone</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "phone" value = {this.state.phone} placeholder="XXX-XXX-XXXX"/>
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="email">Email</label>
              <input onChange ={this.handleInputChange} type="text" className="form-control" name = "email" value = {this.state.email} placeholder="JaneDoe@gmail.com"/>
            </div>
            <div className="form-group ">
              <label htmlFor="address">Address</label>
              <input onChange ={this.handleInputChange} type="text" className="form-control" name = "address" value = {this.state.address} placeholder="1234 Washington St. Suite #100"/>
            </div>
            <div className = "row">
              <div className="form-group col-6">
                <label htmlFor="city">City</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "city" value = {this.state.city} placeholder=""/>
              </div>
              <div className="form-group col-3">
                <label htmlFor="state">State</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "state" value = {this.state.company} placeholder="ex: DC"/>
              </div>
            </div>
            <div className = "row">
              <div className="form-group col-6">
                <label htmlFor="zip_code">Zip Code</label>
                <input onChange ={this.handleInputChange} type="text" className="form-control" name = "zip_code" value = {this.state.zip_code} placeholder=""/>
              </div>
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
    this.props.handleEdits(this.state)
  }


}

export default EditContactInfoModal
