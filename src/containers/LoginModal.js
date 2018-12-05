import React from 'react'
import { connect } from "react-redux"
import * as actions from "../actions/CurrentUserActions"

class LoginModal extends React.Component{
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
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal" >
        <div className = "login-modal-content">
        <div className = "modal-header">
          <h4>Login</h4>
        </div>
        {this.state.errors ?
           <div className="alert alert-danger" role="alert">Incorrect Username or Password</div>
           : null
         }
          <div className = "form-container">
          <br/>
          <form onSubmit = {this.handleSubmit} className = "col-8 offset-2">
            <div className="form-group">
              <label htmlFor="user_name">Username</label>
              <input onChange = {this.handleChange} type="text" name = "user_name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange = {this.handleChange} type="password" name = "password" className="form-control" placeholder="Password"/>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
            <br/>
            <br/>

          </form>
        </div>
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
          // close modal
          this.props.handleClose(null, true)
        }
        else{
          this.props.SetCurrentExpert(data.expert, data.jwt)
          // close modal

        }

      }
    }
  )
  }


}
export default connect(null, actions)(LoginModal)
