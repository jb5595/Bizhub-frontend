import React from "react"

class AccountAnalyticsOverview extends React.Component{
  render(){
  return(
    <React.Fragment>
      <h5 className = "profile-section-header" >BizHub Overview</h5>
      <div className = "bizhub-info-container row">
        <div className = "offset-md-2 offset-1 col-10 col-md-2 ">
          <div className = "bizhub-overview-header">
            Expert Answers:
          </div>
          <div className = "bizhub-overview-info">
            {this.props.answeredQuestions ? this.props.answeredQuestions.length : null}
          </div>
        </div>
        <div className= "col-10 offset-md-0 offset-1 col-md-4">
          <div className = "bizhub-overview-header">
            Top Tags:
          </div>
          <div className = "bizhub-overview-info">
          {this.props.topTags ? this.props.topTags.map(tag => <div key = {tag.id}>{tag.name}</div>) : null}
          </div>
        </div>
        <div className= "col-10 offset-md-0 offset-1 col-md-2 ">
          <div className = "bizhub-overview-header">
            Upvotes:
          </div>
          <div className = "bizhub-overview-info">
            {this.props.total_upvotes}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
}


export default AccountAnalyticsOverview
