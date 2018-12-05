import React from "react"
import { Link } from "react-router-dom"
class DashboardTopInfo extends React.Component{

  render(){
    return(
      <div className = "dashboard-top-info">
      <div className = "row">
        <div className = "col-2">
        <img className = "dashboard-profile-picture" alt = "profile" src = {this.props.user.profile_picture_url}/>
        </div>
        <div className = "col-8">
          <h4>Welcome back {this.props.user.full_name}</h4>
          <Link className = "homepage-link" to = {`/experts/${this.props.user.id}`}>View Profile </Link>
        </div>

      </div>

      </div>
    )
  }
}

export default DashboardTopInfo
