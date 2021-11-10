import React from 'react';
import { TextField, Grid, Fab } from "@material-ui/core";
import SetQuestionText from '../Components/SetQuestionText'
import QuestionMenu from '../Components/QuestionMenu';
import QuestionBlock from '../Components/QuestionBlock';
import SetQuestionImage from '../Components/SetQuestionImage';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

/** 
* @function CreateQuestion - A component handling the creation of a question
* @param {Object} props.question - The current question object stored in the parent component (CreateList)
* OTHER PARAMETERS ARE FUNCTIONS TO SET DATA IN THE QUESTION, THEY ARE DEFINED IN THE PARENT COMPONENT (CreateList)
* @return {JSX} - The JSX for the component
*/
function CreateQuestion(props) {
  const [invalidAnswer, setInvalidAnswer] = React.useState(false) // flag if the answer is invalid

  const answerChange = (event) => { // function that handles a change in the answer input
    let symbolRegex = /^[a-zA-Z0-9-*/&^#@()[\]=+_\\.,; ]*$/ // regular expression to check for valid characters in an answer (other characters are used in the file format as delimiters and markers etc.)
    if (!symbolRegex.exec(event.target.value)) { // validate the answer
      setInvalidAnswer(true)
    } else {
      setInvalidAnswer(false)
      props.answerChange(event) // send the validated answer to the parent component
    }
  }

  return (
    <Grid container style={{ width: "100%", height: "15vh", paddingTop: "1%", paddingBottom: "1%" }} spacing={3}>
      <Grid item xs={1}></Grid>
      {/* drop-down to select the type of the question */}
      <Grid item xs={2}>
        <QuestionMenu setValue={props.setType} type={props.question["TYPE"]} />
      </Grid>

      <Grid item container xs={3} style={{ position: "relative" }}>
        {/* input to set the text of the question */}
        <Grid item xs={12}>
          <SetQuestionText value={props.question["TITLE"]} change={props.titleChange} />
        </Grid>
        {/* input to set the image of the question (optional) */}
        <Grid item xs={12}>
          <SetQuestionImage setImage={props.setImage} question={props.question} />
        </Grid>

      </Grid>
      {/* input to set the answer to the question */}
      <QuestionBlock type={props.question["TYPE"]} question={props.question} invalidAnswer={invalidAnswer} answerChange={answerChange} setCorrect={props.setCorrect} addQuestion={props.addQuestion} addAnswer={props.addAnswer} />
      {/* button to remove the question */}
      <Grid item xs={1}>
        <Fab style={{ backgroundColor: "white", left: "10%" }} onClick={props.deleteQuestion}><DeleteIcon style={{ opacity: 0.7 }} /></Fab>
      </Grid>
    </Grid>
  )
}

export default CreateQuestion;
