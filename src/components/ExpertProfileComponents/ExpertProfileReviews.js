import React from "react"
import StarRatingComponent from 'react-star-rating-component';
import { connect } from "react-redux"
import * as actions from "../../actions/expertProfileActions"
import ReviewDisplay from "../ReviewDisplay"

class ExpertProfileReviews extends React.Component{

  componentDidMount(){
    this.props.loadReviews(this.props.expert_id)
  }
  render(){
    return(
    <div className ="review-container">
    <br/>
      <div>
      {this.props.currentUser && !this.props.currentUserIsExpert ?
        <div>
          <div><b>Review {this.props.expert.full_name}</b></div>
            <StarRatingComponent name = "redirect"
             className = "rating-icon-form" starColor={"#258493"}
             onStarClick={this.redirectToPostReviewPage}/>
             <br/>
             <small>Have you worked with {this.props.expert.full_name}?  </small>
             <small className ="start-review"><b> Start Your Review</b></small>
             <br/><br/> </div> : null}

       <h5>Reviews</h5>
       {this.props.reviews.map(review=><ReviewDisplay review={review} key = {review.id}/>)}
     </div>
    </div>
  )
}
  redirectToPostReviewPage = (e) =>{
    this.props.history.push(`/post/review/${this.props.expert_id}`)
  }
}
const mapStateToProps = (state) =>{
  return {
          currentUser: state.userSession.currentUser,
          currentUserIsExpert : state.userSession.expert,
          reviews: state.expertProfile.reviews,
          reviewsLoading: state.expertProfile.reviewsLoading
        }
}




export default connect(mapStateToProps, actions)(ExpertProfileReviews)
