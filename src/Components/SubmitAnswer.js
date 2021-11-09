import React from 'react'
import { Grid, TextField, Fab } from '@material-ui/core'

/** 
* @function SubmitAnswer - Answer box and submit button for text-based questions
* @param {Object} props.question - The question to be answered
* @return {JSX} - The JSX for the component
*/
function SubmitAnswer(props) {
  const [answer, setAnswer] = React.useState("") // current answer inputted by the user

  const handleAnswerChange = (e) => { // function that handles when the text is changed
    setAnswer(e.target.value)
  }

  const submit = (e) => { // function that handles submitting an answer
    let a = answer
    setAnswer("")
    if (props.question["ANSWERS"].includes(a)) { // check if the answer is correct and submit to the parent component
      props.correctAnswer(true)
    } else {
      props.correctAnswer(false)
    }
  }

  const keyPress = (e) => { // submit on enter keypress
    if (e.key === 'Enter') {
      submit()
    }
  }

  return (
    <Grid container style={{ position: "absolute", bottom: "10%" }}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField autoFocus variant="outlined" value={answer} label="Answer" onKeyPress={keyPress} onChange={handleAnswerChange} style={{ width: "100%", height: "10vh" }} />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={1}>
        <Fab variant="extended" onClick={submit} style={{ backgroundColor: "white" }}>Submit</Fab>
      </Grid>
    </Grid>
  )
}

export default SubmitAnswer
