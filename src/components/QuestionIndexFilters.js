import React from "react"

class QuestionIndexFilters extends React.Component{

  render(){
    return(
      <div>
        <form onSubmit = {this.props.handleSubmit}>
          <div className="row">
            <div className="col-7">
              <input onChange ={this.props.handleChange} value = {this.props.filterText} type="text" className="form-control" placeholder="Search by keyword or Tag"/>
            </div>
            <div className = "filter-buttons">
              <div className="btn-group" role="group" aria-label="Basic example">
                <button onClick = {this.props.handleFilterButtonClick}
                type="button" className="btn btn-secondary">Most Recent</button>
                <button onClick = {this.props.handleFilterButtonClick}
                 type="button" className="btn btn-secondary">Votes</button>
                <button onClick = {this.props.handleFilterButtonClick}
                type="button" className="btn btn-secondary">Unanswered</button>
              </div>
            </div>
          </div>
        </form>
      </div>

    )
  }
}

export default QuestionIndexFilters
