import React from 'react'
import { Grid, TextField, Fab, Menu, MenuItem } from '@material-ui/core'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'

function QuestionMulti(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selected, setSelected] = React.useState(0)

  const OpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const CloseMenu = (event) => {
    setAnchorEl(null)
  }

  const handleMultiItemClick = (event, i) => {
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
        <Fab variant="extended" style={{ backgroundColor: "white", width: 250 }} onClick={OpenMenu}>
          <p style={{ textAlign: "center" }}>Correct Answer: {selected+1}</p>
          <ArrowLeftIcon style={{position: 'absolute', right: 20, opacity: 0.7}} />
        </Fab>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
          {props.question["ANSWERS"].map((answer, i) => {
            return (
              <MenuItem style={{ width: 250, fontSize: 14 }} onClick={(event) => handleMultiItemClick(event, i)}>
                {i+1}
              </MenuItem>
            )
          })}
        </Menu>
      </Grid>
    </Grid>
  )
}

export default QuestionMulti
