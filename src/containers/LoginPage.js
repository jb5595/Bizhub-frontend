import React from 'react'
import { connect } from "react-redux"
import * as actions from "../actions/CurrentUserActions"

class LoginPage extends React.Component{
  constructor(){
    super()
    this.state = {
      user: {
        user_name: null,
        password: null,
      },
      errors: null
    }

  }

  render(){
    return(
      <div>
      {this.state.errors ?
         <div className="alert alert-danger" role="alert">Incorrect Username or Password</div>
         : null
       }
        <div className = "form-container">
        <form onSubmit = {this.handleSubmit} className = "col-6 offset-3">
          <div className="form-group">
            <label htmlFor="user_name">Username</label>
            <input onChange = {this.handleChange} type="text" name = "user_name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input onChange = {this.handleChange} type="password" name = "password" className="form-control" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
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
    fetch("http://localhost:3000/user_auth/", {
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
        if (data.user){
          this.props.SetCurrentUser(data.user, data.jwt)
          this.props.history.push("/")
        }
        else{
          this.props.SetCurrentExpert(data.expert, data.jwt)
          this.props.history.push("/")

        }

      }
    }
  )
  }


}
export default connect(null, actions)(LoginPage)
