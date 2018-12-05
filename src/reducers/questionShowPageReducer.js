export default function questionShowPageReducer(state =
  { questionLoading: false, questionObject: {}, upvotesLoading:false, upvotes: [], upvoteScore: 0 }
  ,action) {
  switch (action.type) {
    case "LOADING_QUESTION":
    return {...state, questionLoading:true }
    case "FETCH_QUESTION":
    return {...state, questionLoading:false, questionObject: action.questionObject}
    case "LOADING_UPVOTES":
    return {...state, upvotesLoading:true }
    case "FETCH_UPVOTES":
    return {...state,upvotesLoading:false,
            upvotes:action.upvotesObject.upvotes,
            upvoteScore:action.upvotesObject.upvoteScore  }

    default:
    return state
  }
}
