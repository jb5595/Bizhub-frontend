import React from "react"
import { Link } from "react-router-dom"
import LoginModal from "../../containers/LoginModal"
class NavBarPreloginButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openModal: false
    }
  }
  render(){
    return(
      <React.Fragment>
        <Link to = "/create_user"><button className = "navbar-button">Create User</button></Link>
        <span onClick = {this.openLoginModal} className = "sign-in-button">Sign In</span>
        {this.state.openModal ? <LoginModal handleClose = {this.closeModal}/> : null}
      </React.Fragment>
    )
  }
closeModal = (e, forceClose = false) =>{
  if (forceClose || e.target.id === "closeModal"){
    this.setState({
      openModal: false
    })
  }
}


openLoginModal = () =>{
  this.setState({
    openModal: true
  })
}
}

export default NavBarPreloginButtons
