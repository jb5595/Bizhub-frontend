import React from "react"
import { FaEdit } from "react-icons/fa";

const WebsiteViewURl = process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/experts/"
                                  :"https://pacific-mesa-20126.herokuapp.com/experts/"
// const WebsiteViewURl = "https://pacific-mesa-20126.herokuapp.com/experts/"
class ContactInfo extends React.Component{
  render(){
    return(
      <React.Fragment>
      {/* Renders edit button if user is looking at own profile, edit button
        opens modal to edit profile on click  */}
      {this.props.canEdit ?<div onClick = {this.props.handleEdit} className = "edit-top-info-button">
        <FaEdit/>
      </div>:null}
      <h5 className = "profile-section-header" >Connect</h5>
      <div className = "contact-info-container row">
          <div className = "col-7 offset-1">
            <div className = "contact-header">
              Website
            </div>
            <div className = "contact-info">
            {/* Links to external website, and logs website click when user
              clicks link  */}
              <a onClick ={this.handleClick} href = {`http://${this.props.website}`}>{this.props.website}</a>
            </div>
            <div className = "contact-header">
              Phone
            </div>
            <div className = "contact-info">
              {this.props.phone}
            </div>
            <div className = "contact-header">
              Email
            </div>
            <div className = "contact-info">
              {this.props.email}
            </div>
          </div>
          <div className = "col-4">
            <div className = "contact-header">
              Address
            </div>
            <div className = "contact-info">
              {this.props.address}
            </div>
            <div className = "contact-info">
              {this.props.city}, {this.props.state}
            </div>
            <div className = "contact-info">
              {this.props.zipcode}
            </div>
            <div className = "contact-info">
              United States
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  handleClick = () =>{
    /* Links to external website, and posts website click to backend when user
      clicks link  */
      fetch(WebsiteViewURl + this.props.id  + "/website_clicks",{
        method: "POST",
        headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.jwt}`,
              Accept: "application/json"
            },
        body: JSON.stringify(this.props.id)
      })

    }
  }

export default ContactInfo
