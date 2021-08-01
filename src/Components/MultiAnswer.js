import React from 'react'
import { Grid, Fab, Paper } from '@material-ui/core'

const colors = {
  standard: "#ffffff",
  selected: "#548BDF"
}

function MultiAnswer(props) {
  const [selected, setSelected] = React.useState(null)

  const submit = (e) => {
    let s = selected
    setSelected(null)
    let correct = (s === props.question["CORRECT"])
    props.correctAnswer(correct)
    console.log(correct)
  }

  const handleSelect = (index) => {
    console.log("Selected: ", index)
    if (selected === index) {
      setSelected(null)
    } else {
      setSelected(index)
    }
  }

  return (
    <Grid container style={{ position: "absolute", bottom: "15%" }}>
      <Grid item xs={4}></Grid>
      <Grid item container spacing={3} xs={4}>
        {props.question["ANSWERS"].map((answer, i) => {
          return (
            <Grid item xs={6}>
              <Paper onClick={() => (handleSelect(i))} elevation={3} style={{ width: "100%", height: "5vh", borderRadius: "10px", backgroundColor: selected===i ? colors.selected : colors.standard }}>
                <p style={{ fontSize: 20, paddingTop: "1.4vh" }}>
                  {answer}
                </p>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={1}>
        <div style={{ paddingTop: "2vh" }}><Fab variant="extended" onClick={submit} style={{ backgroundColor: "white" }}>Submit</Fab></div>
      </Grid>
    </Grid>
  )
}

export default MultiAnswer
