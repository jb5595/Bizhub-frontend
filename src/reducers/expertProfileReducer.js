export default function manageExpertProfileVisit(state = { profileLoading: false, expertObject: {}, reviewsLoading:false, reviews:[] }, action) {
  switch (action.type) {
    case "LOADING_PROFILE":
    return {...state, profileLoading:true }
    case "FETCH_PROFILE":
    return {...state, profileLoading:false, expertObject: action.expertObject}
    case "LOADING_REVIEWS":
    return {...state, reviewsLoading:true}
    case "FETCH_REVIEWS":
    return {...state, reviewsLoading: false, reviews: action.reviews}
    default:
    return state
  }
}
