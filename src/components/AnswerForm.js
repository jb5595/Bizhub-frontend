import React from 'react'

const AnswerURl = process.env["NODE_ENV"] === "development" ?
                                      "http://localhost:3000/answers/"
                                     :"https://pacific-mesa-20126.herokuapp.com/answers/"

class AnswerForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      answer: {
        content: "",

      }
    }
  }
  render(){
    return(
      <div  className ="answer-question-form ">
      <br/>

        <h5>Your Answer</h5>
        <form onSubmit = {this.handleSubmit}>
          <textarea className = "form-control "value = {this.state.answer.content} onChange = {this.handleChange}/>
          <br/>
          <button className = "btn btn-primary">Post Answer</button>
        </form>
        <br/>
        <br/>

      </div>
    )
  }
  handleChange = (e) =>{
    this.setState({
      answer:{
        ...this.state.answer,
        content: e.target.value
      }
    })
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    let body = {
      answer:{
          question_id: this.props.questionId,
          expert_id: this.props.expertId,
          content: this.state.answer.content
    }}
    console.log(this.state)
    fetch(AnswerURl,{
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.props.jwt}`,
        "Content-Type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        answer:{
          ...this.state.answer,
          content: ''
        }
      })
      this.props.reloadQuestion(true)
    })
  }


}

export default AnswerForm
