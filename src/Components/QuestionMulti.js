import React from 'react'
import { Grid, TextField, Fab, Menu, MenuItem } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'

/** 
* @function QuestionMulti - Component that handles the creation of multiple choice answers
* @return {JSX} - The JSX for the component
*/
function QuestionMulti(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selected, setSelected] = React.useState(props.question ? props.question["CORRECT"] : 0)
  const [selectedField, setSelectedField] = React.useState(0)

  const refs = Array(props.question["ANSWERS"].length).fill(React.useRef(null))

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

  // const keyPress = (e, i) => {
  //   if (e.key === 'Enter' && e.shiftKey) {
  //     e.preventDefault()
  //     props.addQuestion()
  //   } else if (e.key === 'Enter') {
  //     e.preventDefault()
  //     props.addAnswer()
  //     // refs[i + 1].current.focus()
  //   }
  // }

  const onFocus = (e, i) => {

  }

  return (
    <Grid item container xs={4} spacing={3}>
      <Grid item xs={12}>
        <TextField defaultValue={props.question["ANSWERS"].join(';') || ""} onChange={(e) => (props.answerChange(e))} variant="outlined" label={props.invalidAnswer ? "Error" : "Answers - Separate with ';'"} style={{ width: "100%" }} onKeyPress={(e) => keyPress(e)} />
      </Grid>
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
