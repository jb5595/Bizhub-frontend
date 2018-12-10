
import React from "react"
import ExpertPreviewContainer from "./ExpertPreviewContainer"
import ExpertIndexFilters from "../components/ExpertIndexFilters"
// const ExpertsURL =  process.env["NODE_ENV"] === "development" ?
//                                   "http://localhost:3000/experts/"
//                                   :"https://pacific-mesa-20126.herokuapp.com/experts/"
const ExpertsURL ="https://pacific-mesa-20126.herokuapp.com/experts/"
class ExpertIndex extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      experts: [],
      filterText: "",
      displayExperts: []
    }
  }
  componentDidMount(){
    fetch(ExpertsURL)
    .then(resp => resp.json())
    .then(data => this.setState(
      {experts:data,
      displayExperts: data
      }))
  }
  handleFilterButtonClick = (e) =>{
    let fileredResults
    switch (e.target.innerHTML) {
      case "Rating":
        fileredResults = this.state.displayExperts.sort((a, b) => b.average_rating - a.average_rating )
        break
      case "Votes":
      fileredResults = this.state.displayExperts.sort((a, b) => b.total_upvotes - a.total_upvotes )
        break
      case "Most Active":
      fileredResults = this.state.displayExperts.sort((a, b) => b.answered_questions.length - a.answered_questions.length )
      break
      default:
        fileredResults = this.state.displayExperts
    }
    this.setState({
      displayExperts: fileredResults
    })

  }
  handleFilterTextChange = (e) =>{
    this.setState({
      filterText: e.target.value
    })
  }
  filterSearchResults = (e) =>{
    e.preventDefault()
    let searchTerm = this.state.filterText.toLowerCase()
    let displayExperts = this.state.experts.filter(expert =>
      this.fullNameIncludeSearchTerm(expert,searchTerm)||
      this.jobTitleIncludeSearchTerm(expert, searchTerm)||
      this.aboutIncludesSearchTerm(expert, searchTerm)||
      this.companyIncludeSearchTerm(expert, searchTerm)||
      this.tagsIncludeSearchTerm(expert, searchTerm) ||
      this.topTagsIncludeSearchTerm(expert, searchTerm))

    this.setState({
      displayExperts: displayExperts,
      filterText: ""
    })
  }
  tagsIncludeSearchTerm(expert,searchTerm){
    return expert.tags.find(tag => tag.name.toLowerCase().includes(searchTerm))
  }
  topTagsIncludeSearchTerm(expert,searchTerm){
    return expert.top_tags.find(tag => tag.name.toLowerCase().includes(searchTerm))
  }
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
  render(){
    return(
      <div>
        <div className = "dashboard-container search-bar-additional-padding">
          <ExpertIndexFilters handleFilterButtonClick = {this.handleFilterButtonClick}
          handleSubmit = {this.filterSearchResults} handleChange = {this.handleFilterTextChange} filterText = {this.state.filterText}/>
          <br/><br/>

        </div>
      <div className = "col-8 offset-2">

        {this.state.displayExperts.length !== 0 ? <ExpertPreviewContainer experts = {this.state.displayExperts}/> : <div><br/><br/>There Doesn't Appear to Be Anything Here. Try a different search term</div>}
      </div>
    </div>
    )
  }
}

export default ExpertIndex
