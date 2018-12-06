import React from "react"
import ExpertProfileReviews from "../ExpertProfileComponents/ExpertProfileReviews"

class Reviews extends React.Component{

  render(){
    return(
      <div>
        <div className = "analytics">
        <h4>Your Reviews</h4>
          <div className = "profile_views dashboard-container ">
            <div className = "dashboard-question-preview">
              <ExpertProfileReviews history = {this.props.history}
              expert ={this.props.currentUser} expert_id = {this.props.currentUser.id}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Reviews
