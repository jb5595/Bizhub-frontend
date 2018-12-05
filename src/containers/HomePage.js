import React from "react"
import { Link } from 'react-router-dom';

class HomePage extends React.Component{
  render(){
    return(
      <div className = "home-page">
        <div className="hero-image">
          <div className="hero-text">
            <h1>Smart Business Decisions Start Here</h1>
            <div>
              <Link to = "/experts"><button className = "btn btn-primary">Find a Service Provider</button></Link>
              <Link to = "/questions"><button className = "btn btn-primary">Browse Questions</button></Link>
            </div>
          </div>
        </div>
        <div className = "grey-top-bar">
        </div>
        <div className = "about-subsection">
        <div className = "row">
          <div className = "offset-3" >


          </div>
        </div>
          <div className = "row">
            <div className = "offset-3 offset-md-1" >
              <img
              className = "homepage-about-image"
              alt = "hand-shake"
              src = "https://images.unsplash.com/photo-1519120126473-8be7aedcd6c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a55332dfc236b13f118ef77a36b4052f&auto=format&fit=crop&w=1050&q=80"
              />
            </div>
            <div className = "homepage-about-text offset-1 col-12 col-md-4">
              <h2>Business Owners/Entreprenuers</h2>
              <ul>
                <li>Post a business related question, tag it, and get answers from qualified business services professionals </li>
                <li>Browse previosly posted questions </li>
                <li>Find and connect with qualifed business services professionals </li>

              </ul>
              <p>  Want to post a question? <Link className = "homepage-link" to = "/create_user">Create an Account </Link> or
                <Link className = "homepage-link" to = "/login"> Sign In </Link> </p>
            </div>
          </div>
          <div className = "row about-subsection ">
            <div className = " homepage-about-text offset-1 col-md-4 offset-md-1 col-md-5">
            <h2>Service Providers</h2>
            <p> Get your company in front of our users in 20 minutes or less and start growing your client-base. Demonstrate your expertise and build your reputation by answering user posted questions in your areas of expertise. <Link to = "/create_expert_profile" className = "homepage-link"> Create Your Account</Link> </p>

            </div>
            <div className = "offset-3 offset-md-1" >
              <img
              className = "homepage-about-image"
              alt = "hand-shake"
              src = "https://images.unsplash.com/photo-1526541081349-3ee69702354c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
