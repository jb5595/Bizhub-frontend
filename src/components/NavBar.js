import React from "react"
import { IoIosContacts } from "react-icons/io";
import { Link } from 'react-router-dom';
import NavbarSearch from "./NavbarComponents/NavbarSearch"
import NavBarPreloginButtons from "./NavbarComponents/NavbarPreloginButtons"
import NavBarPostloginButtons from "./NavbarComponents/NavbarPostLoginButtons"

import { connect } from "react-redux"


class NavBar extends React.Component{

  render(){
    return(
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-nav">
          <Link to = "/"> <IoIosContacts className = "navbar-icon"/> BizHub <span className="sr-only">(current)</span></Link>
          </div>
          <NavbarSearch history = {this.props.history}/>

          <div>
            {this.props.currentUser ?<NavBarPostloginButtons history = {this.props.history}/>:<NavBarPreloginButtons/>}
          </div>
        </nav>
        <nav className="navbar sub-nav navbar-dark bg-dark">
          <Link to = "/experts">Find a Service Provider</Link>
          <Link to = "/questions">Browse Questions</Link>
          {this.props.currentUser? null :
          <Link to = "/service_providers"> For Service Providers</Link>}
        </nav>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) =>{
  return {currentUser: state.userSession.currentUser}
}

export default connect(mapStateToProps)(NavBar)
