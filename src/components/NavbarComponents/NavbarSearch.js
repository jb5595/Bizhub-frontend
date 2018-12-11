
import React from "react"
import { MdQuestionAnswer } from "react-icons/md";


// const QuestionsSearchPreviewURL = process.env["NODE_ENV"] === "development" ?
//                                    "http://localhost:3000/questions/searchPreview/"
//                                   :"https://pacific-mesa-20126.herokuapp.com/questions/searchPreview/"
// const ExpertsSearchPreviewURL = process.env["NODE_ENV"] === "development" ?
//                                    "http://localhost:3000/experts/searchPreview/"
//                                   :"https://pacific-mesa-20126.herokuapp.com/experts/searchPreview/"
const QuestionsSearchPreviewURL = "https://pacific-mesa-20126.herokuapp.com/questions/searchPreview/"
const ExpertsSearchPreviewURL = "https://pacific-mesa-20126.herokuapp.com/experts/searchPreview/"
class NavBarSearch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm: "",
      qaResults:[],
      expertResults: [],

    }
  }
  handleChange = (e) =>{
    this.setState({
      searchTerm: e.target.value
    })
  if (e.target.value !== "" && e.target.value !== " "){
    fetch(QuestionsSearchPreviewURL + e.target.value)
    .then(resp => resp.json())
    .then(data => this.setState({qaResults: data}))
    fetch(ExpertsSearchPreviewURL + e.target.value)
    .then(resp => resp.json())
    .then(data => this.setState({expertResults: data}))
    }
    else {
      this.setState({
        qaResults: [],
        expertResults: []
      })
    }
  }
  render(){

    return(
      <div className="col-6">
      <form onSubmit ={this.handleSearchReRoute}>
        <input onChange ={this.handleChange} name ="searchTerm"
        value = {this.state.searchTerm} className="form-control"
         type="search" placeholder="Search BizHub..." />
        <div className = "navbar-search-results-preview-container">
          {this.state.qaResults && this.state.qaResults.length !== 0 ?
              this.renderQaResults()
              : null}
          {this.state.expertResults && this.state.expertResults.length !== 0 ?
             this.renderExpertResults()
             : null }
        </div>
      </form>
    </div>
    )
  }

  renderQaResults = () =>{
    return(
      <React.Fragment>
        <div className = "nav-bar-search-result-title row">
          <div>
            Q&A
          </div>
          <div onClick = {this.handleQuestionSearchReRoute} className = "offset-lg-9 see-all-button col-lg-2 offset-6">
            See All
          </div>
        </div>
        {this.state.qaResults.map(question =>
          <div key = {question.id} className = "nav-bar-search-result">
          <MdQuestionAnswer/><span className = "search-result-link"
          data-id = {question.id} onClick = {this.handleQuestionReRoute}>{question.question}</span></div>)}
      </React.Fragment>
    )
  }
  renderExpertResults =() =>{
    return(
      <React.Fragment>
        <div className = "nav-bar-search-result-title row">
          <div>
            Experts
          </div>
          <div onClick = {this.handleExpertSearchReRoute} className = "see-all-button offset-lg-9 col-lg-2 offset-5">
            See All
          </div>
        </div>
        {this.state.expertResults.map(expert =>
          <div key = {expert.id} className = "nav-bar-search-result">
          <div className = "row expert-search-result">
          <img className = "search-picture-thumbnail" alt = "profile" src = {expert.profile_picture_url}/>
          <div className = "col-6">
            <div className = "col-12">
              <b><span  data-id = {expert.id} className = "search-result-link"
               onClick = {this.handleExpertReRoute}>{expert.full_name}</span></b>
            </div>
            <div className = "col-12">
            <small> {expert.job_title} @ {expert.company} </small>
            </div>
          </div>
          </div>
          </div>)
        }
      </React.Fragment>
    )
  }
handleSearchReRoute = (e) =>{
  e.preventDefault()
  this.resetState()
  this.props.history.push(`/search/${this.state.searchTerm}`)
}
handleQuestionSearchReRoute = () =>{
  this.resetState()
  this.props.history.push(`/search/questions/${this.state.searchTerm}`)
}
handleExpertSearchReRoute = (e) =>{
  this.resetState()
  this.props.history.push(`/search/experts/${this.state.searchTerm}`)
}


handleExpertReRoute = (e) => {
  this.resetState()
  this.props.history.push(`/experts/${e.target.dataset.id}`)
}

  handleQuestionReRoute = (e) =>{
    this.resetState()
    this.props.history.push(`/questions/${e.target.dataset.id}`)
  }
  resetState(){
    this.setState({
      qaResults: [],
      expertResults: [],
      searchTerm: ""
    })
  }
}

export default NavBarSearch
