import React from "react"
import { Link } from 'react-router-dom';

class ServiceProviderLanding extends React.Component{
  render(){
    return(
      <div className = "home-page">
        <div className="hero-image service-provider-hero">
          <div className="hero-text">
            <h1>Establish your brand and manage your online reputation</h1>
            <Link to = "/create_expert_profile"><button className = "btn btn-primary">Create Your Account</button></Link>

          </div>
        </div>
        <div className = "grey-top-bar">
        </div>
        <div className = "about-subsection">
        <div className = "row">
          <div className = "offset-3 col-6" >
            Get your company in front of our users in 20 minutes or less and start growing your client-base.
            Demonstrate your expertise and build your reputation by answering user posted questions in your areas of expertise.
          </div>
        </div>

        </div>
      </div>
    )
  }
}

export default ServiceProviderLanding
