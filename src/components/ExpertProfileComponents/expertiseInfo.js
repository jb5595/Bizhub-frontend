import React from "react"
import { FaEdit } from "react-icons/fa";

const ExpertiseInfo = (props) =>{
  return(
    <React.Fragment>
      <h5 className = "profile-section-header">Expertise</h5>
      {props.canEdit ? <div onClick = {props.handleEdit} className = "edit-expert-tags-button">
        <FaEdit/>
      </div>:null}
      {props.canEdit ? <p>Add skills or industry expertise to help users find you on Bizhub</p> : null}
        <div className = "row">
          <div className = "expertise-tag-container col-8 offset-2">
          {props.tags ? props.tags.map(tag => <div key ={tag.id} className = "expertise-tag">{tag.name}</div> ): null}
        </div>
      </div>
    </React.Fragment>
  )
}


export default ExpertiseInfo
