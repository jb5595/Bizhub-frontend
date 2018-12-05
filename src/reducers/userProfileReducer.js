export default function userProfileReducer(state = { userLoading: false, questionsLoading:false, userObject: null, userQuestions: null }, action) {
  switch (action.type) {
    case "LOADING_USER":
    return {...state, userLoading:true }
    case "FETCH_USER":
    return {...state, userLoading:false, userObject: {...state.userObject, ...action.userObject}}
    case "LOADING_USERS_QUESTIONS":
    return {...state, questionsLoading: true}
    case "FETCH_USERS_QUESTIONS":
    return {...state, questionsLoading:false, userQuestions: [...action.questions]}
    default:
    return state
  }
}
