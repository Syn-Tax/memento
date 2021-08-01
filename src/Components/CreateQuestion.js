import React from 'react';
import { TextField, Grid, Fab } from "@material-ui/core";
import SetQuestionBlock from '../Components/SetQuestionBlock';
import QuestionMenu from '../Components/QuestionMenu';
import QuestionBlock from '../Components/QuestionBlock';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';


function CreateQuestion(props) {
    const [invalidAnswer, setInvalidAnswer] = React.useState(false)

    const answerChange = (event, index) => {
        let symbolRegex = /^[a-zA-Z0-9-*/&^#@()[\]=+_\\., ]*$/;
        if (!symbolRegex.exec(event.target.value)) {
            setInvalidAnswer(true)
        } else {
            setInvalidAnswer(false)
            props.answerChange(index, event)
        }
    }


    return (
        <Grid container style={{ width: "100%", height: "5%", paddingTop: "1%", paddingBottom: "1%" }} spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <QuestionMenu setValue={props.setType} type={props.question["TYPE"]} />
          </Grid>
          <Grid item xs={3}>
            <SetQuestionBlock type={props.question["TYPE"]} value={props.question["TITLE"]} change={props.titleChange} />
          </Grid>
          <QuestionBlock type={props.question["TYPE"]} question={props.question} invalidAnswer={invalidAnswer} answerChange={answerChange} setCorrect={props.setCorrect} />
          <Grid item container xs={1} spacing={3}>
            <Fab display="inline" size="small" style={{ backgroundColor: "white", top: "2vh" }} onClick={props.addAnswer}><AddIcon style={{ opacity: 0.7 }} /></Fab>
            <Fab display="inline" size="small" style={{ backgroundColor: "white", top: "2vh", left: "20%" }} onClick={props.removeAnswer}><RemoveIcon style={{ opacity: 0.7 }} /></Fab>
          </Grid>
          <Grid item xs={1}>
            <Fab style={{ backgroundColor: "white", left: "10%" }} onClick={props.deleteQuestion}><DeleteIcon style={{ opacity: 0.7 }} /></Fab>
          </Grid>
        </Grid>
    )

}

export default CreateQuestion;
