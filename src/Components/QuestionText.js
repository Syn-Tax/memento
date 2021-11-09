import React from 'react'
import { Grid, TextField } from '@material-ui/core'

/** 
* @function QuestionText - Component that handles the creation of text based answers
* @return {JSX} - The JSX for the component
*/
function QuestionText(props) {
  return (
    <Grid item container xs={3} spacing={3}>
      {props.question["ANSWERS"].map((answer, i) => {
        return (
          <Grid item xs={12}>
            <TextField defaultValue={answer || ""} onChange={(e) => (props.answerChange(e, i))} variant="outlined" label={props.invalidAnswer ? "Error" : "Answer"} error={props.invalidAnswer} helperText={props.invalidAnswer ? "Answer cannot contain ';'" : ""} style={{ width: "100%" }} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default QuestionText
