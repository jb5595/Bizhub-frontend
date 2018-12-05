import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

const ExpertProfileQAInfo = (props) =>{
  return(
    <div className = "col-8 offset-2">
        <QuestionDisplayContainer history = {props.history} questions = {props.questions}/>
    </div>
  )
}


export default ExpertProfileQAInfo
