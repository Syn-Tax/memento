import React from 'react'
import { TextField } from '@material-ui/core'

/** 
* @function SetQuestionText - Component to choose the question during the creation of a list
* @return {JSX} - The JSX of the component
*/
function SetQuestionText(props) {
  return (
    <div>
      <TextField variant="outlined" style={{ width: "100%" }} label="Question" value={props.value} onChange={props.change} />
    </div>
  )
}

export default SetQuestionText
