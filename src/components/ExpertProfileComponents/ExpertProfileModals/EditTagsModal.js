import React from "react"

// const TagURL = process.env["NODE_ENV"] === "development" ?
//                                   "http://localhost:3000/tags/match/"
//                                   :"https://pacific-mesa-20126.herokuapp.com/tags/match/"
const TagURL = "https://pacific-mesa-20126.herokuapp.com/tags/match/"
class EditTagsModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tagTerm: "",
      tagSearchResults: [],
      tags: this.props.tags
      }
  }
  render(){
    return(
      <div onClick = {this.props.handleClose} id = "closeModal"  className = "modal">
      <div className="modal-content" >
        <div className="modal-header">
          <h4>Edit Expertise Tags</h4>
        </div>
        <div className="modal-body tag-modal">
          <br/><br/>
          <form onSubmit = {this.handleNewTagCreation}>
            <label htmlFor="tag"><b>Tags</b></label>
            <input onChange = {this.handleChange} type="text"  maxLength = "150" className="form-control"
            name = "tagTerm" value = {this.state.tagTerm}
            placeholder="e.g. (Social Media Marketing, Accounting)"/>
          </form>
          <div className = "tag-results-display-container">
            {this.state.tagTerm !== ""  ? this.state.tagSearchResults.slice(0,5).map(tag =>
              <p key = {tag.id} id = {tag.id} onClick = {this.addTag}
               className = "tag-results-display">{tag.name}</p> ): null}
          </div>
          <br/>
          <label htmlFor="tag"><b>Your Expertise</b></label>
          <div className = "selected-tags">
          {this.state.tags.map((tag, idx) =>
            <div key = {idx} className = "expertise-tag">{tag.name}
            <span data-name = {tag.name} className = "remove-tag" onClick = {this.removeTag}> X  </span> </div>)}
          </div>
          <br/>
            <button onClick = {this.submitEdits} className = "btn btn-primary">Save Changes</button>
          <br/><br/>

        </div>
      </div>

      </div>
    )
  }
  addTag = (e) =>{
    this.setState({
      tagTerm: "",
      tagSearchResults: [],
      tags: [...this.state.tags, {name: e.target.innerHTML}]
    })
  }
handleNewTagCreation = (e) =>{
  e.preventDefault()
  this.setState({
    tagTerm: "",
    tagSearchResults: [],
    tags:[...this.state.tags, {name: e.target.tagTerm.value}]
  })
}
removeTag = (e)=>{

  let newTags = this.state.tags.filter(tag => tag.name !== e.target.dataset.name)
  this.setState({
    tags: newTags
  })
}
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value !== "" && e.target.value !== " "){
      fetch(TagURL + e.target.value)
      .then(response => response.json())
      .then(data =>
        this.setState({
        tagSearchResults: data
      }))

    }

  }
  submitEdits = (e) =>{
    let payload = this.state.tags.map(tag => tag.name)
    this.props.handleEdits({tags:payload})
  }


}

export default EditTagsModal
