
const BASEEXPERTURL = "http://localhost:3000/experts/"

export function loadProfile(expertID){

  return (dispatch) => {
    dispatch( {type:"LOADING_PROFILE"});
    return fetch(BASEEXPERTURL + expertID).then(response => {
      return response.json()
    }).then(expertObject => {
      dispatch({type: "FETCH_PROFILE", expertObject})
  })
  }
}

export function loadReviews(expertID){

  return (dispatch) => {
    dispatch( {type:"LOADING_REVIEWS"});
    return fetch(BASEEXPERTURL + `${expertID}/reviews`).then(response => {
      return response.json()
    }).then(reviews => {
      dispatch({type: "FETCH_REVIEWS", reviews})
  })
  }
}
