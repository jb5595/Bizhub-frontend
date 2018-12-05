import React from "react"
import { FaEdit } from "react-icons/fa";

const WebsiteViewURl = "http://localhost:3000/experts/"

class ContactInfo extends React.Component{
  render(){
    return(
      <React.Fragment>
      {this.props.canEdit ?<div onClick = {this.props.handleEdit} className = "edit-top-info-button">
        <FaEdit/>
      </div>:null}
      <h5 className = "profile-section-header" >Connect</h5>
      <div className = "contact-info-container row">
          <div className = "col-5 offset-2">
            <div className = "contact-header">
              Website
            </div>
            <div className = "contact-info">
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
