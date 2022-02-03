import React from 'react'
import { Grid, Fab, Paper } from '@material-ui/core'
import { HotKeys, Handlers } from 'react-keyboard'

const keyMap = {
  selectOne: "1",
  selectTwo: "2",
  selectThree: "3",
  selectFour: "4"
}

// colour setup to dynamically draw the colour of an item
const colors = {
  standard: "#ffffff",
}

/** 
* @function MultiAnswer - Component that gives users the ability to answer multiple choice questions
* @param {Qbject} props.question - the current question that is being displayed
* @return {JSX} - the JSX of the component 
*/
function MultiAnswer(props) {

  const submit = (index) => { // function that handles when an answer is submitted
    let s = index
    let correct = (s === props.question["CORRECT"])
    props.correctAnswer(correct)
  }

  const handleSelect = (index) => { // function that handles when an answer is selected
    if (props.question["ANSWERS"].length > index) {
      submit(index)
    }
  }

  const handlers = {
    selectOne: () => handleSelect(0),
    selectTwo: () => handleSelect(1),
    selectThree: () => handleSelect(2),
    selectFour: () => handleSelect(3),
  }

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <Grid container style={{ position: "absolute", bottom: "15%" }}>
        <Grid item xs={4}></Grid>
        <Grid item container spacing={3} xs={4}>
          {props.question["ANSWERS"].map((answer, i) => {
            return (
              <Grid item xs={6}>
                <Paper onClick={() => (handleSelect(i))} elevation={3} style={{ width: "100%", height: "5vh", borderRadius: "10px", backgroundColor: colors.standard }}>
                  <p style={{ position: "absolute", paddingLeft: "1vw", opacity: 0.7 }}>{i + 1}</p>
                  <p style={{ fontSize: 20, paddingTop: "1vh" }}>
                    {answer}
                  </p>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </HotKeys>
  )
}

export default MultiAnswer
