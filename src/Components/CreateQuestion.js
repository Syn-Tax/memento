import React from 'react';
import { TextField, Grid, Fab } from "@material-ui/core";
import QuestionMenu from '../Components/QuestionMenu';
import SetQuestion from '../Components/SetQuestion';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';


function CreateQuestion(props) {
    const [invalidAnswer, setInvalidAnswer] = React.useState(false)
    const [type, setType] = React.useState("text")

    const answerChange = (event, index) => {
        let symbolRegex = /^[a-zA-Z0-9-*\/&^#@()\[\]=+_\\., ]*$/;
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
                {/* <QuestionMenu setValue={setType} type={type} /> */}
            </Grid>
            <Grid item xs={3}>
                <SetQuestion type={type} value={props.question["TITLE"]} change={props.titleChange} />
            </Grid>
            <Grid item container xs={3} spacing={3}>
                {props.question["ANSWERS"].map((answer, i) => {
                    return (
                    <Grid item xs={12}>
                        <TextField defaultValue={answer || ""} onChange={(e) => (answerChange(e, i))} variant="outlined" label={invalidAnswer ? "Error" : "Answer"} error={invalidAnswer} helperText={invalidAnswer ? "Answer cannot contain ';'" : ""} style={{ width: "100%" }} />
                    </Grid>
                    )
                })}
            </Grid>
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