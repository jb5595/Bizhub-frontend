import React, { Component } from 'react';
import HomePage from "./containers/HomePage"
import ExpertProfile from "./containers/ExpertProfile"
import UserProfile from "./containers/UserProfile"
import NavBar from "./components/NavBar"
import QuestionShowPage from "./containers/questionShowPage"
import CreateUserPage from "./containers/CreateUserPage"
import LoginPage from "./containers/LoginPage"
import PostQuestionPage from "./containers/PostQuestionPage"
import QuestionIndexPage from "./containers/QuestionsIndexPage"
import ExpertIndex from "./containers/ExpertIndex"
import SiteWideSearchResults from './containers/SiteWideSearchResults'
import CreateExpertAccountPage from "./containers/CreateExpertAccountPage"
import ReviewForm from "./containers/ReviewForm"
import ServiceProviderLanding from "./containers/ServiceProviderLanding"
import Dashboard from "./containers/Dashboard"
import { connect } from "react-redux"
import * as actions from "./actions/CurrentUserActions"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

const ProfileViewURl = process.env["NODE_ENV"] === "development" ?
                                 "http://localhost:3000/experts/"
                                 :"https://pacific-mesa-20126.herokuapp.com/experts"

class App extends Component {

  componentDidMount(){
    // logs in user from local storage
    if (localStorage.getItem("userId")){
      let id = localStorage.getItem("userId")
      let jwt = localStorage.getItem("jwt")
      let userType = localStorage.getItem("userType")

      userType === "Expert" ?
      this.props.loginExpertFromLocalStorage(id, jwt) :
      this.props.loginUserFromLocalStorage(id, jwt)
    }
  }
  postProfileView(expertId){
    // Posts Profile View when expert profile is visited
    fetch(ProfileViewURl + expertId  + "/profile_views",{
      method: "POST",
      headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.jwt}`,
            Accept: "application/json"
          },
      body: JSON.stringify(expertId)
    })

  }
  render() {
    return (
      <Router>
        <div className="App">
        {/* Loads Navbar on top of every page */}
          <Route path = "/" render = {props => <NavBar {...props}/>}/>
          <Route path="/" exact render = {props => <HomePage {...props} />} />
          <Route path='/users/:id' render={(props)=> {
            let userId = props.match.params.id
            return <UserProfile {...props} id = {userId}/>
          }} />
          <Route path = "/experts" exact render = {(props) => {
            return <ExpertIndex {...props} />}}
            />
          <Route path = "/experts/:id" render = {(props) =>{
            let expertId = props.match.params.id
            /* Posts profile view whenever expert profile is visited */
            this.postProfileView(expertId)
            return <ExpertProfile {...props} id = {expertId}/>
          }}/>
          <Route path = "/post/question" render = {(props) =>{
            return <PostQuestionPage {...props} />
          }}/>
          <Route path = "/questions" exact render = {(props) =>{
            return <QuestionIndexPage {...props} />
          }}/>
          <Route path = "/questions/:id" render = {(props) =>{
            let questionId = props.match.params.id
            return <QuestionShowPage {...props} id = {questionId}/>
          }}/>
          <Route path = "/create_user" render = {(props) =>{
            return <CreateUserPage {...props} />
          }}/>
          <Route path = "/login" render = {(props) =>{
            return <LoginPage {...props} />
          }}/>
          <Route path = "/search/:search_term/" exact render = {(props =>{
            let searchTerm = props.match.params.search_term
            return <SiteWideSearchResults {...props} searchTerm = {searchTerm}/>
          })}/>
          <Route path = "/search/questions/:search_term" render = {(props =>{
            let searchTerm = props.match.params.search_term
            return <SiteWideSearchResults {...props} display = {'Questions'} searchTerm = {searchTerm}/>
          })}/>
          <Route path = "/search/experts/:search_term" render = {props =>{
            let searchTerm = props.match.params.search_term
            return <SiteWideSearchResults {...props} display = {'Experts'} searchTerm = {searchTerm}/>
          }}/>
          <Route path = "/create_expert_profile" render = {(props) =>{
            return <CreateExpertAccountPage {...props} />
          }}/>
          <Route path ="/post/review/:expert_id" render = {(props) =>{
            let expert_id = props.match.params.expert_id
            return <ReviewForm {...props} expert_id = {expert_id} />
          }}/>
          <Route path = "/service_providers" render = { (props) =>{
            return <ServiceProviderLanding/>
          }}/>
          <Route path = "/dashboard/:expert_id" render = { (props) =>{
            let expert_id = props.match.params.expert_id
            return <Dashboard {...props} expert_id = {expert_id}/>
          }}/>


        </div>

      </Router>
    );
  }

}

export default connect(null, actions)(App);
