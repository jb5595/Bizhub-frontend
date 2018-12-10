import React from 'react'
import QuestionDisplayContainer from "./QuestionDisplayContainer"
import ExpertPreviewContainer from "./ExpertPreviewContainer"


// const QuestionsURL = process.env["NODE_ENV"] === "development" ?
                                 // "http://localhost:3000/questions/"
                                 // :"https://pacific-mesa-20126.herokuapp.com/questions/"
// const ExpertsURL = process.env["NODE_ENV"] === "development" ?
//                                  "http://localhost:3000/experts/"
//                                  :"https://pacific-mesa-20126.herokuapp.com/experts/"
const QuestionsURL ="https://pacific-mesa-20126.herokuapp.com/questions/"
const ExpertsURL = "https://pacific-mesa-20126.herokuapp.com/experts/"

class SiteWideSearchResults extends React.Component {
  constructor(props){
    super(props)
    let displayOption = this.props.display ? this.props.display : "Questions"
    this.state ={
      questions: [],
      displayQuestions: [],
      experts: [],
      displayExperts: [],
      searchTerm: this.props.searchTerm,
      displayOption: displayOption
    }
  }

  componentDidMount(){
    fetch(QuestionsURL)
    .then(resp => resp.json())
    .then(data => this.setState({
      questions: data,
      displayQuestions: this.filteredQuestionResults(data)
    }))
    fetch(ExpertsURL)
    .then(resp => resp.json())
    .then(data => this.setState({
      experts: data,
     displayExperts: this.filteredExpertResults(data)
    }))
    }

  handleChange = (e) =>{
    this.setState({
      searchTerm: e.target.value
    })
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    this.setState({
      displayExperts: this.filteredExpertResults(),
      displayQuestions: this.filteredQuestionResults()
    })
  }

  render(){
    return(
      <div>
        <div className = "dashboard-container">
        <br/>
          <form className = "col-8 offset-2" onSubmit = {this.handleSubmit}>
                <input onChange ={this.handleChange} value = {this.state.searchTerm} type="text" className="form-control" placeholder="Search by keyword or Tag"/>
          </form>
          <br/>
          <div className = "row">
              <div className = "feed-top-bar row">
                <div onClick = {this.displayQuestions} className = {this.state.displayOption === "Questions"? "top-bar-item active-menu-item" :"top-bar-item"}>
                  Questions
                </div>
                <div onClick = {this.displayExperts}  className = {this.state.displayOption === "Experts"? "top-bar-item active-menu-item" :"top-bar-item"}>
                  Experts
                </div>
              </div>
          </div>
        </div>
        <div className = "col-8 offset-2">
          {this.renderResults()}
       </div>
    </div>
    )
  }
  displayQuestions = () =>{
    this.setState({
      displayOption: "Questions"
    })
  }
  displayExperts = () =>{
    this.setState({
      displayOption: "Experts"
    })
  }

  renderResults(){
    if (this.state.displayOption === "Questions"){
        return(
          <QuestionDisplayContainer
           history = {this.props.history}
           questions = {this.state.displayQuestions}/>)
    }
    else{
      return <ExpertPreviewContainer experts = {this.state.displayExperts}/>
    }
   }
   // Allow ability to pass in data for filtering on redirect when dealing with
   // asynchronious state update
   filteredExpertResults = (data =null) =>{
     let searchTerm = this.state.searchTerm.toLowerCase()
     let experts = data ? data : this.state.experts
     let displayExperts = experts.filter(expert =>
       this.fullNameIncludeSearchTerm(expert,searchTerm)||
       this.jobTitleIncludeSearchTerm(expert, searchTerm)||
       this.aboutIncludesSearchTerm(expert, searchTerm)||
       this.companyIncludeSearchTerm(expert, searchTerm))
       return displayExperts
   }

   //////// Helper Methods to filter Experts ////////
   fullNameIncludeSearchTerm(expert, searchTerm){
     if (expert.full_name){
       if(expert.full_name.toLowerCase().includes(searchTerm)){
         return true
       }
     }
     return false
   }
   companyIncludeSearchTerm(expert, searchTerm){
     if (expert.company){
       if(expert.company.toLowerCase().includes(searchTerm)){
         return true
       }
     }
     return false
   }
   jobTitleIncludeSearchTerm(expert, searchTerm){
     if (expert.job_title){
       if(expert.job_title.toLowerCase().includes(searchTerm)){
         return true
       }
     }
     return false
   }

   aboutIncludesSearchTerm(expert,searchTerm){
     if (expert.about){
       if(expert.about.toLowerCase().includes(searchTerm)){
         return true
       }
     }
     return false
   }

  // Filtering For Questions
   filteredQuestionResults = (data = null) =>{
     let searchTerm = this.state.searchTerm.toLowerCase()
     let questions  = data ? data : this.state.questions
     let displayQuestions = questions.filter(question =>
       question.question_details.toLowerCase().includes(searchTerm)|| this.tagsIncludesSearchTerm(question, searchTerm) )

      return displayQuestions

   }
   // Questions filtering Helper Method
   tagsIncludesSearchTerm = (question, searchTerm) =>{

     if (question.tags.some(tag => tag.name.toLowerCase().includes(searchTerm))){
       return true
     }
     else {
       return false
     }
   }


}

export default SiteWideSearchResults
