import React from 'react'
import { Grid, TextField } from '@material-ui/core'

/** 
* @function QuestionText - Component that handles the creation of text based answers
* @return {JSX} - The JSX for the component
*/
function QuestionText(props) {
  return (
    <Grid item container xs={3} spacing={3}>
      <Grid item xs={12}>
        <TextField defaultValue={props.question["ANSWERS"].join(';') || ""} onChange={(e) => (props.answerChange(e))} variant="outlined" label="Answers - Separate with ';'" style={{ width: "100%" }} />
      </Grid>
    </Grid>
  )
}

export default QuestionText
