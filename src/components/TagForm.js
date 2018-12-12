import React from "react"

const TagURL = process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/tags/match/"
                                  :"https://pacific-mesa-20126.herokuapp.com/tags/match/"

class TagForm extends React.Component{
  constructor(){
    super()
    this.state = {
      tagTerm: "",
      tagSearchResults: []
    }
  }
  render(){
    return(
      <div>
        <form onSubmit = {this.handleSubmit}>
          <label htmlFor="tag"><b>Tags</b></label>
          <input onChange = {this.handleChange} type="text"  maxLength = "150" className="form-control"
          name = "tagTerm" value = {this.state.tagTerm}
          placeholder="e.g. (Social Media Marketing, Accounting)"/>
        </form>
        <div className = "tag-results-display-container">
          {this.state.tagTerm !== "" ?
            this.state.tagSearchResults.map(tag =>
              <p key = {tag.id} id = {tag.id} onClick = {this.addTag}
             className = "tag-results-display">{tag.name}</p> )
           : null}
        </div>
        <br/>
        <label><b>Selected Tags</b></label>
        <div className = "selected-tags">
          {this.props.tags.map((tag, idx) =>
            <div key = {idx} className = "expertise-tag">{tag}
            <span data-name = {tag} className = "remove-tag" onClick = {this.removeTag}> X  </span> </div>)}
        </div>
      </div>
    )
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    this.props.addTag(e.target.tagTerm.value)
    this.setState({
      tagTerm: "",
      tagSearchResults: [],
    })
  }
  removeTag = (e) =>{
    this.props.removeTag(e.target.dataset.name)
  }
  addTag = (e) =>{
    this.props.addTag(e.target.innerHTML)
    this.setState({
      tagTerm: "",
      tagSearchResults: []
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value !== "" && e.target.value !== " "){
      fetch(TagURL + e.target.value)
      .then(response => response.json())
      .then(data => this.setState({
        tagSearchResults: data
      }))
    }

  }
}

export default TagForm
