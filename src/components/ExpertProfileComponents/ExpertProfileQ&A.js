import React from "react"
import QuestionDisplayContainer from "../../containers/QuestionDisplayContainer"

const ExpertProfileQAInfo = (props) =>{
  return(
        <QuestionDisplayContainer history = {props.history} questions = {props.questions}/>
  )
}


export default ExpertProfileQAInfo
