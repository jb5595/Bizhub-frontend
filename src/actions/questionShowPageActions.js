
// const BASEQUESTIONSURL = process.env["NODE_ENV"] === "development" ?
                                  // "http://localhost:3000/questions/"
                                  // :"https://pacific-mesa-20126.herokuapp.com/questions/"
const BASEQUESTIONSURL = "https://pacific-mesa-20126.herokuapp.com/questions/"
export function loadQuestion(questionId){

  return (dispatch) => {
    dispatch( {type:"LOADING_QUESTION"});
    return fetch(BASEQUESTIONSURL + questionId).then(response => {
      return response.json()
    }).then(questionObject => {
      dispatch({type: "FETCH_QUESTION", questionObject})
  })
  }
}
export function loadUpvotes(questionId){
  return (dispatch) => {
    dispatch( {type:"LOADING_UPVOTES"});
    return fetch(BASEQUESTIONSURL + questionId + "/question_upvotes").then(response => {
      return response.json()
    }).then(upvotesObject => {
      dispatch({type: "FETCH_UPVOTES", upvotesObject})
  })
  }
}
