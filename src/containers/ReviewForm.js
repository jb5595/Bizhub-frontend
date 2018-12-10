import React from "react"
import { connect } from "react-redux"
import StarRatingComponent from 'react-star-rating-component';

// const ReviewUrl = process.env["NODE_ENV"] === "development" ?
//                                  "http://localhost:3000/reviews/"
//                                  :"https://pacific-mesa-20126.herokuapp.com/reviews"
const ReviewUrl = "https://pacific-mesa-20126.herokuapp.com/reviews"
class ReviewForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expert_id: this.props.expert_id,
      user_id: this.props.currentUser.id,
      score: 0,
      title: "",
      details:""
    }
  }
  onStarClick= (nextValue, prevValue, name) =>{
    this.setState({score: nextValue});
  }
  handleChange = (e) =>{
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  render(){
    return(
      <div>
        <br/>
        <form onSubmit = {this.handleSubmit} className = "col-6 offset-3 reviews-form">
          <div >
            <StarRatingComponent className = "rating-icon-form" starColor={"#258493"} onStarClick={this.onStarClick} name = "score"/>
          </div>
          <label htmlFor="title"><b>Headline</b></label>
          <input onChange = {this.handleChange} value = {this.state.title}
           className = "form-control" name = "title"/>
          <label><b>Review</b></label>
          <textarea htmlFor = "details"
          onChange = {this.handleChange} name = "details"
          value = {this.state.details} className = "form-control"/>
          <br/>
          <button className = "btn btn-primary">Submit Review</button>
        </form>
      </div>
    )
  }
handleSubmit = (e) =>{
  e.preventDefault()
  let body ={review:this.state}
  fetch(ReviewUrl,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${this.props.jwt}`,
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(data =>this.props.history.push(`/experts/${this.props.expert_id}`))
}
}
const mapStateToProps = (state) =>{
  return {
          jwt:state.userSession.jwt,
          currentUser:state.userSession.currentUser,
          CurrentUserIsExpert: state.userSession.expert,
          expert: state.expertProfile.expertObject,
          profileLoading: state.expertProfile.profileLoading

        }
}
export default connect(mapStateToProps)(ReviewForm)
