import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

// Added Expert Profile QA info to allow for future customizability and styling
// if wanted
const ExpertProfileQAInfo = (props) =>{
  return(
        <QuestionDisplayContainer history = {props.history} questions = {props.questions}/>
  )
}


export default ExpertProfileQAInfo
