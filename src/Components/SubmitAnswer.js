import React from 'react'
import { Grid, TextField, Fab } from '@material-ui/core'

function SubmitAnswer(props) {
  const [answer, setAnswer] = React.useState("")

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value)
  }

  const submit = (e) => {
    let a = answer
    setAnswer("")
    if (props.question["ANSWERS"].includes(a)) {
      props.correctAnswer(true)
    } else {
      props.correctAnswer(false)
    }
  }

  const keyPress = (e) => {
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
