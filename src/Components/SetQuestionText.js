import React from 'react'
import { TextField } from '@material-ui/core'

function SetQuestionText(props) {
  return (
    <div>
      <TextField variant="outlined" style={{ width: "100%" }} label="Question" value={props.value} onChange={props.change} />
    </div>
  )
}

export default SetQuestionText
