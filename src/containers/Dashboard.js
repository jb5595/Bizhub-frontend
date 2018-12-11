import React from "react"
import { connect } from "react-redux"
import DashboardTopInfo from "../components/DashBoardComponents/DashboardTopInfo"
import SuggestedQuestions from "../components/DashBoardComponents/SuggestedQuestions"
import Analytics from "../components/DashBoardComponents/Analytics"
import AnswersPreview from "../components/DashBoardComponents/AnswersPreview"
import SuggestedQuestionsPreview from "../components/DashBoardComponents/SuggestedQuestionsPreview"
import YourAnswers from "../components/DashBoardComponents/YourAnswers"
import Reviews from "../components/DashBoardComponents/Reviews"

// const MatchingQuestionsURL = process.env["NODE_ENV"] === "development" ?
//                                   "http://localhost:3000/experts/suggested_questions/"
//                                   :"https://pacific-mesa-20126.herokuapp.com/experts/suggested_questions/"
// const BaseAnalyticsURl = process.env["NODE_ENV"] === "development" ?
//                                   "http://localhost:3000/experts/analytics/"
//                                   :"https://pacific-mesa-20126.herokuapp.com/experts/analytics/"

const MatchingQuestionsURL = "https://pacific-mesa-20126.herokuapp.com/experts/suggested_questions/"
const BaseAnalyticsURl ="https://pacific-mesa-20126.herokuapp.com/experts/analytics/"
class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedSubPage: "Overview",
      suggested_questions: null,
      analytics: null
    }

  }
  componentDidMount(){
    this.loadMatchingQuestions()
    this.loadAnalytics()
  }


  render(){
    return(
      <div>
      <div className = "dashboard-container dashboard-top-info-container">

          <br/><br/>
            {this.props.currentUser ? <DashboardTopInfo user={this.props.currentUser}/> :null}
              <div className = "row dashboard-info-menu">
              {/* Displays Active menu items with underline */}

                <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "Overview" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
                  Overview
                </div>
                {/* Displays Active menu items with underline */}

                <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "Suggested Questions" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
                  Suggested Questions
                </div>
                {/* Dispalys Active menu items with underline */}

                <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "Your Answers" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
                Your Answers

                </div>
                {/* Dispalys Active menu items with underline */}

                <div onClick = {this.menuSelector} className = {this.state.selectedSubPage === "Your Reviews" ? "profile-menu-option active-menu-option":"profile-menu-option"}>
                  Your Reviews
                </div>
          </div>
        </div>
        {this.props.currentUser ?this.renderSubInformation() :null}
      </div>
    )
  }
  showAnswers = (e) =>{
    this.setState({
      selectedSubPage: "Your Answers"
    })
  }
  renderSubInformation(){
    switch (this.state.selectedSubPage) {
      case "Overview":
        if (this.state.analytics && this.state.suggested_questions){
          return (
            <div>
              <Analytics profile_views = {this.state.analytics.profile_views} website_clicks = {this.state.analytics.website_clicks}/>
              <AnswersPreview answers_overview = {this.props.currentUser.answers_overview} handleClick = {this.showAnswers} history = {this.props.history} questions ={this.props.currentUser.answered_questions.slice(0,3)}/>
              <SuggestedQuestionsPreview history = {this.props.history} handleClick = {this.showSuggestedQuestions} questions ={this.state.suggested_questions.slice(0,3)}/>/>
            </div>)
        }
        else{
          return null
        }

      case "Your Answers":
       return   <YourAnswers answers_overview = {this.props.currentUser.answers_overview} history = {this.props.history} questions ={this.props.currentUser.answered_questions}/>
      case "Suggested Questions":
        if (this.state.suggested_questions){
          return <SuggestedQuestions history = {this.props.history} questions ={this.state.suggested_questions}/>
        }
        else{
          return null
        }
      case "Your Reviews":
      return <Reviews currentUser = {this.props.currentUser}
      history = {this.props.history} expert ={this.props.currentUser} expert_id = {this.props.currentUser.id}/>
      default:

    }
}
showSuggestedQuestions = (e) =>{
  this.setState({
    selectedSubPage: "Suggested Questions"
  })
}
  menuSelector = (e) =>{
    this.setState({
      selectedSubPage: e.target.innerText
    })
   }

   loadMatchingQuestions = () =>{
     fetch(MatchingQuestionsURL + this.props.expert_id)
     .then(resp => resp.json())
     .then(data =>{
       this.setState({
         suggested_questions: data
       })
     })

   }
   loadAnalytics = () => {
     fetch(BaseAnalyticsURl + this.props.expert_id)
     .then(resp => resp.json())
     .then(data =>{
       this.setState({
         analytics: data
       })
     })
   }


}

const mapStateToProps = (state) =>{

  return {
          jwt:state.userSession.jwt,
          userLoading: state.userSession.loadingCurrentUser,
          currentUser:state.userSession.currentUser,
        }
      }

export default connect(mapStateToProps)(Dashboard)
