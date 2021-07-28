import React from 'react';
import { Grid, TextField, Menu, MenuItem, Fab } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

function QuestionType(props) {
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

  if (props.type === "text") {
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
  } else if (props.type === "multi") {
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
      Correct Answer:
      <Fab variant="extended" style={{ backgroundColor: "white", width: 150 }} onClick={OpenMenu}>
      <TextFieldsIcon style={{ opacity: 0.7, position: "absolute", left: 20 }} />
      <p style={{ textAlign: "center" }}>{selected+1}</p>
      <ArrowLeftIcon style={{position: 'absolute', right: 20, opacity: 0.7}} />
      </Fab>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
      {props.question["ANSWERS"].map((answer, i) => {
        return (
          <MenuItem style={{ width: 150, fontSize: 14 }} onClick={(event) => handleMultiItemClick(event, i)}>
          {i+1}
          </MenuItem>
        )
      })}
      </Menu>
      </Grid>
      </Grid>
    )

  }
}

export default QuestionType;
