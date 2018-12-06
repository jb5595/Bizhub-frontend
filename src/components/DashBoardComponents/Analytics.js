import React from "react"

class Analytics extends React.Component{
  constructor(props){
    super(props)
    /* Calculates percentage difference for both profile views and profile
     website clicks
     PercentDif = (Amount this month - Amount Last Month)/(Amount Last Month)
    */
    this.state = {
      viewPercentDifference: (((this.props.profile_views.views_this_month-this.props.profile_views.views_last_month)/this.props.profile_views.views_last_month)*100).toFixed(2),
      clickPercentDifference: (((this.props.website_clicks.clicks_this_month-this.props.website_clicks.clicks_last_month)/this.props.website_clicks.clicks_last_month)*100).toFixed(2)

    }
  }
  render(){
    return(
      <div>
        <div className = "analytics">
        <h4>Analytics</h4>
          <div className = "profile_views dashboard-container ">
            <h5>
              Profile Views
            </h5>
            <small>Get more profile views by answering questions.</small>
            <div className = "row offset-1">
              <div className = "analytics-header">
                <div>
                  <b>Total Views</b>
                </div>
                <div>
                  {this.props.profile_views.total_views}
                </div>
              </div>
              <div className = "analytics-header">
                <div>
                  <b>Views This Month</b>
                </div>
                <div>
                  {this.props.profile_views.views_this_month}
                </div>
                {/* Conditionaly Renders Positive Change in Green Text and negative in red */}
                {this.state.viewPercentDifference > 0 ?
                   <small className = "increase">+{this.state.viewPercentDifference}%</small> :
                   <small className = "decrease">({this.state.viewPercentDifference}%)</small> }
              </div>
              <div className = "analytics-header">
                <div>
                  <b>Views Last Month</b>
                </div>
                <div>
                  {this.props.profile_views.views_last_month}
                </div>
              </div>
            </div>
          </div>
          <div className = "profile_views dashboard-container ">
            <h5>
              Website Clicks
            </h5>
            <div className = "row offset-1">
              <div className = "analytics-header">
                <div>
                  <b>Total Clicks</b>
                </div>
                <div>
                  {this.props.website_clicks.total_clicks}
                </div>
              </div>
              <div className = "analytics-header">
                <div>
                  <b>Clicks This Month</b>
                </div>
                <div>
                  {this.props.website_clicks.clicks_this_month}
                </div>
                {/* Conditionaly Renders Positive Change in Green Text and negative in red */}
                {this.state.clickPercentDifference > 0 ?
                   <small className = "increase">+{this.state.clickPercentDifference}%</small> :
                   <small className = "decrease">({this.state.clickPercentDifference}%)</small> }
              </div>
              <div className = "analytics-header">
                <div>
                  <b>Clicks Last Month</b>
                </div>
                <div>
                  {this.props.website_clicks.clicks_last_month}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Analytics
