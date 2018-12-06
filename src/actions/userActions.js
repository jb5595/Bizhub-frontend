const BASEUSERURL = process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/users/"
                                  :"https://pacific-mesa-20126.herokuapp.com/users"

export function loadUserProfile(userID){
  return (dispatch) => {
    dispatch( {type:"LOADING_USER"});
    return fetch(BASEUSERURL + userID).then(response => {
      return response.json()
    }).then(userObject => {
      dispatch({type: "FETCH_USER", userObject})
  })
  }
}

export function loadUserQuestions(userID){
  return (dispatch) => {
    dispatch( {type:"LOADING_USERS_QUESTIONS"});
    return fetch(BASEUSERURL + userID + "/questions").then(response => {
      return response.json()
    }).then(questions => {
      dispatch({type: "FETCH_USERS_QUESTIONS", questions})
  })
  }
}
