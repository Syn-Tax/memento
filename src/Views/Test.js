import React from 'react';
import { useLocation, useParams, Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { loadList } from '../Utils/List';
import BackButton from '../Components/BackButton';
import { TextField, Grid, Fab, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';

const timeLimits = {"slow": 15,
                    "medium": 10,
                    "fast": 5,
                    "eat_my_dust": 3}

function Test(props) {
    const { search } = useLocation()
    const { pathStr } = useParams()
    const questions = loadList(pathStr)
    const [question, setQuestion] = React.useState(questions[Math.floor(Math.random()*questions.length)])
    const [numQuestions, setNumQuestions] = React.useState(0)
    const [answer, setAnswer] = React.useState("")
    const [time, setTime] = React.useState(1)
    const [timeDialog, setTimeDialog] = React.useState(false)
    const [continueDialog, setContinueDialog] = React.useState(false)
    const [endDialog, setEndDialog] = React.useState(false)
    const [correct, setCorrect] = React.useState(true)

    const history = useHistory()

    const queryStr = queryString.parse(search)

    let parent_path

    if (pathStr.split("-").length > 1) {
        parent_path = "/folder/" + pathStr.split("-").slice(0, -1).join("-")
    } else {
        parent_path = "/"
    }

   React.useEffect(() => {
        const interval = setTimeout(() => incrementTime(), 1000);
        return () => {
            clearTimeout(interval);
        };
    }, [time]);

    const incrementTime = () => {
        if (queryStr["speed"] != 1) {
            setTime(time + 1)
            console.log(time)

            if (time > timeLimits[queryStr["speed"]]) {
                setTimeDialog(true)
            }
        }
    }

    const backButtonClick = () => {
        history.push(`/list/${pathStr}`)
    }

    const continueFunc = () => {
        setAnswer("")
        setTime(1)
        handleDialogClose()
        if (isEnd()) {
            setEndDialog(true)
        }
        newQuestion()
    }

    const isEnd = () => {
        if (queryStr["question"] == "none") {
            return false
        } else {
            return queryStr["question"] < numQuestions
        }
    }

    const handleDialogClose = () => {
        setTimeDialog(false)
        setContinueDialog(false)
    }

    const newQuestion = () => {
        setQuestion(questions[Math.floor(Math.random()*questions.length)])
        setNumQuestions(numQuestions+1)
    }

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value)
    }

    const submit = (e) => {
        console.log("Submitted", answer)
        if (question["ANSWERS"].includes(answer)) {
            console.log("Correct")
            setCorrect(true)
            setContinueDialog(true)
        } else {
            setCorrect(false)
            setContinueDialog(true)
            console.log("Incorrect")
        }
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            submit()
        }
    }

    return (
        <div>
            <Link to={parent_path}><BackButton /></Link>
            <div>
                <div style={{ opacity: 0.7, paddingTop: "20%", fontSize: "14pt" }}>Write the answer below</div>
                <div style={{ paddingTop: "1%", fontSize: "20pt" }}>{question["TITLE"]}</div>
                <Grid container style={{ position: "absolute", bottom: "10%" }}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}><TextField autoFocus variant="outlined" value={answer} label="Answer" onKeyPress={keyPress} onChange={handleAnswerChange} style={{ width: "100%" }} /></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                        <Fab variant="extended" onClick={submit} style={{ backgroundColor: "white" }}>Submit</Fab>
                    </Grid>
                </Grid>
            </div>

            <Dialog open={continueDialog} onClose={handleDialogClose} >
                <DialogTitle>{`${correct ? "Well Done!" : "So Close!"} Do you wish to continue?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={backButtonClick}>Back</Button>
                    <Button onClick={continueFunc} autoFocus>Continue</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={endDialog} onClose={backButtonClick} >
                <DialogTitle>{"Well Done! You have made it to the end. Do you wish to continue?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={backButtonClick} autoFocus>Continue</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={timeDialog} onClose={handleDialogClose} >
                <DialogTitle>{"You are out of time for this question. Do you wish to continue?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={backButtonClick}>Back</Button>
                    <Button onClick={continueFunc} autoFocus>Continue</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Test;