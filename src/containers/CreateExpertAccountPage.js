import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions/CurrentUserActions"

const ExpertURL = "http://localhost:3000/experts/"

class CreateExpertAccountPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expert:{
        user_name: "",
        password: "",
        email: "",
        full_name: "",
        job_title: "",
        company: ""
      },
      errors: null
    }
  }

  render(){
    return(
      <div>
      {this.state.errors ?
         <div className="alert alert-danger" role="alert">Unable to Create Account, Please Try Again</div>
         : null
       }
        <div>
          <br/><br/>
          <form onSubmit = {this.handleSubmit} className = "create-expert-form dashboard-container col-6 offset-3">
            <br/>
            <div className="form-group ">
              <label htmlFor="user_name">Username</label>
              <input onChange ={this.handleInputChange} type="text" className="form-control" name = "user_name" value = {this.state.expert.user_name} placeholder="Enter Username"/>
            </div>
            <div className="form-group ">
              <label htmlFor="password">Password</label>
              <input onChange ={this.handleInputChange} type="password" className="form-control" name = "password" value = {this.state.expert.password} placeholder="Enter Password"/>
            </div>
            <div className="form-group ">
              <label htmlFor="email">Email</label>
              <input onChange ={this.handleInputChange} type="text" className="form-control" name = "email" value = {this.state.expert.email} placeholder="Enter Email"/>
            </div>
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
            <button className = "btn btn-primary">Create Account</button>
            <br/><br/><br/>
          </form>
        </div>
    </div>
    )
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    let body = {expert: this.state.expert}
    fetch(ExpertURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
           Accept: "application/json"
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
    .then(data =>{
      if (data.error){
        this.setState({
          errors: data.error
        })
      }
      else{
        this.props.SetCurrentExpert(data.expert, data.jwt)
        this.props.history.push(`/experts/${data.expert.id}`)
      }
    })
  }

  handleInputChange = (e) =>{
    this.setState({
      expert:{
        ...this.state.expert,
        [e.target.name]: e.target.value

      }
    })
  }



}


export default connect(null,actions)(CreateExpertAccountPage)
