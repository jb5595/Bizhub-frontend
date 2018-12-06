
const BASEEXPERTURL = process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/experts/"
                                  :"https://pacific-mesa-20126.herokuapp.com/experts"
const BaseUserURl = process.env["NODE_ENV"] === "development" ?
                                  "http://localhost:3000/users/"
                                  :"https://pacific-mesa-20126.herokuapp.com/users"

export function SetCurrentUser(currentUser, jwt){

  return (dispatch) => {
    return dispatch( {type:"SET_CURRENT_USER", currentUser, jwt});
  }

}

export function SetCurrentExpert(currentUser, jwt){
  return (dispatch) => {
    return dispatch( {type:"SET_CURRENT_EXPERT", currentUser, jwt});
  }

}

export function UpdateCurrentUser(currentUser){

  return (dispatch) => {
    return dispatch( {type:"UPDATE_CURRENT_USER", currentUser});
  }

}

export function loginExpertFromLocalStorage(expertId, jwt){
    return (dispatch) => {
      dispatch( {type:"LOADING_CURRENT_USER"});
      return fetch(BASEEXPERTURL + expertId).then(response => {
        return response.json()
      }).then(currentUser => {
        dispatch({type: "SET_CURRENT_EXPERT", currentUser, jwt})
    })
    }
}

export function loginUserFromLocalStorage(userId, jwt){
    return (dispatch) => {
      dispatch( {type:"LOADING_CURRENT_USER"});
      return fetch( BaseUserURl + userId).then(response => {
        return response.json()
      }).then(currentUser => {
        dispatch({type: "SET_CURRENT_USER", currentUser, jwt})
    })
    }
}

export function logout(){

  return (dispatch) => {
    return dispatch( {type:"LOGOUT"})
  }

}
