export default function ManageBrowser(state = { BrowserProps: null }, action) {
    switch (action.type) {

    case "SET_BROWSER_PROPS":
      return {BrowserProps: action.props}
    default:
      return state
  }
}
