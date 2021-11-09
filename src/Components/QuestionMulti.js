import React from 'react'
import { Grid, TextField, Fab, Menu, MenuItem } from '@material-ui/core'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'

/** 
* @function QuestionMulti - Component that handles the creation of multiple choice answers
* @return {JSX} - The JSX for the component
*/
function QuestionMulti(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selected, setSelected] = React.useState(props.question ? props.question["CORRECT"] : 0)

  const openMenu = (event) => { // function that handles opening the menu
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = (event) => { // function that handles closing the menu
    setAnchorEl(null)
  }

  const handleMultiItemClick = (event, i) => { // function that handles an item click
    setAnchorEl(null)
    props.setCorrect(i)
    setSelected(i)
  }

  return (
    <Grid item container xs={3} spacing={3}>
      {props.question["ANSWERS"].map((answer, i) => {
        return (
          <Grid item xs={12}>
            <TextField defaultValue={answer || ""} onChange={(e) => (props.answerChange(e, i))} variant="outlined" label={props.invalidAnswer ? "Error" : "Answer"} error={props.invalidAnswer} helperText={props.invalidAnswer ? "Answer cannot contain ';'" : ""} style={{ width: "100%" }} />
          </Grid>
        )
      })}
      <Grid item xs={12}>
        <Fab variant="extended" style={{ backgroundColor: "white", width: 250 }} onClick={openMenu}>
          <p style={{ textAlign: "center" }}>Correct Answer: {selected + 1}</p>
          <ArrowLeftIcon style={{ position: 'absolute', right: 20, opacity: 0.7 }} />
        </Fab>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
          {props.question["ANSWERS"].map((answer, i) => {
            return (
              <MenuItem style={{ width: 250, fontSize: 14 }} onClick={(event) => handleMultiItemClick(event, i)}>
                {i + 1}
              </MenuItem>
            )
          })}
        </Menu>
      </Grid>
    </Grid>
  )
}

export default QuestionMulti
