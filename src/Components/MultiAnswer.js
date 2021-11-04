import React from 'react'
import { Grid, Fab, Paper } from '@material-ui/core'

// colour setup to dynamically draw the colour of an item
const colors = {
  standard: "#ffffff",
  selected: "#548BDF"
}

/** 
* @function MultiAnswer - Component that gives users the ability to answer multiple choice questions
* @param {Qbject} props.question - the current question that is being displayed
* @return {JSX} - the JSX of the component 
*/
function MultiAnswer(props) {
  const [selected, setSelected] = React.useState(null) // state for storing the selected item

  const submit = (e) => { // function that handles when an answer is submitted
    let s = selected
    setSelected(null)
    let correct = (s === props.question["CORRECT"])
    props.correctAnswer(correct)
  }

  const handleSelect = (index) => { // function that handles when an answer is selected
    if (selected === index) { // if it is already selected, deselect it
      setSelected(null)
    } else { // otherwise change the highlighted item to the clicked one
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
              <Paper onClick={() => (handleSelect(i))} elevation={3} style={{ width: "100%", height: "5vh", borderRadius: "10px", backgroundColor: selected === i ? colors.selected : colors.standard }}>
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
