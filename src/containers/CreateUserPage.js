import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import * as actions from "../actions/CurrentUserActions"
const UserUrl = process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/users/"
                                  :"https://pacific-mesa-20126.herokuapp.com/users/"
class CreateUserPage extends React.Component{
  constructor(){
    super()
    this.state = {
      user: {
        user_name: "",
        email: "",
        password: "",
        size_range: "1-25",
        location: "",
        industry: "",
      },
      errors: null
    }

  }

  render(){
    return(
      <div>
      {this.state.errors ?
         <div className="alert alert-danger" role="alert">Unable to Create User, Please Try Again</div>
         : null
       }
        <div className = "form-container ">
        <form onSubmit = {this.handleSubmit} className = "col-6 offset-3 dashboard-container">
          <br/><br/>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input value = {this.state.email} onChange = {this.handleChange} type="email" className="form-control" name = "email" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="user_name">Username</label>
            <input value = {this.state.user_name} onChange = {this.handleChange} type="text" name = "user_name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">This will be your display name on the website choose something that will let you stay anonymous </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input value = {this.state.password}  onChange = {this.handleChange} type="password" name = "password" className="form-control" placeholder="Password"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Location</label>
            <input value = {this.state.location}  onChange = {this.handleChange} type="text" name = "location" className="form-control" placeholder="ex: Washington, DC"/>
            <small className="form-text text-muted">This will help ensure you are connnected with the right expert to answer your question</small>
          </div>
          <div className="form-group">
            <label htmlFor="industry">Industry(s)</label>
            <input value = {this.state.industry}  onChange = {this.handleChange} type="text" name = "industry" className="form-control" placeholder="ex: Manufacturing, Retail"/>
            <small className="form-text text-muted">This will help ensure you are connnected with the right expert to answer your question</small>
          </div>

          <div className="form-group">
            <label htmlFor="size-range">Size Range</label>
            <select value = {this.state.size_range} onChange = {this.handleChange} className="form-control" name = "size_range">
              <option>{'1-25'}</option>
              <option>{'25-75'}</option>
              <option>{"75-150"}</option>
              <option>{"150-500"}</option>
              <option>{"500+"}</option>
            </select>
            <small className="form-text text-muted">This will help ensure you are connnected with the right expert to answer your question</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <br/><br/>
        </form>
      </div>
        Already a user? <Link to = "/login"> Sign In </Link>
    </div>
    )
  }
  handleChange = (e) => {
    this.setState({
      user:
      {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let body = {user: this.state.user}
    fetch(UserUrl, {
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
        this.props.SetCurrentUser(data.user, data.jwt)
        this.props.history.push("/")
      }
    }
  )
  }


}
export default connect(null, actions)(CreateUserPage)
