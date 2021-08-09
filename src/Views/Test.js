import React from 'react';
import { useLocation, useParams, Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { loadList } from '../Utils/List';
import BackButton from '../Components/BackButton';
import SubmitAnswer from '../Components/SubmitAnswer';
import MultiAnswer from '../Components/MultiAnswer';
import { TextField, Grid, Fab, Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';

const electron = window.require('electron')
const path = electron.remote.require('path')

const imgFolder = path.join(electron.remote.app.getPath('userData'), "./Data/.images")

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
    const [time, setTime] = React.useState(1)
    const [timeDialog, setTimeDialog] = React.useState(false)
    const [continueDialog, setContinueDialog] = React.useState(false)
    const [endDialog, setEndDialog] = React.useState(false)
    const [correct, setCorrect] = React.useState(true)
    const [correctCount, setCorrectCount] = React.useState(0)
    const [totalCount, setTotalCount] = React.useState(0)

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
    }, [time]); // eslint-disable-line

    const incrementTime = () => {
        if (queryStr["speed"] !== 1) {
            setTime(time + 1)

            if (time > timeLimits[queryStr["speed"]]) {
                setTimeDialog(true)
            }
        }
    }

    const backButtonClick = () => {
        history.push(`/list/${pathStr}`)
    }

    const finishButtonClick = () => {
        history.push(`/end/${pathStr}?total=${totalCount}&correct=${correctCount}`)
    }

    const continueFunc = () => {
        setTime(1)
        handleDialogClose()
        if (isEnd()) {
            setEndDialog(true)
        }
        newQuestion()
    }

    const isEnd = () => {
        if (queryStr["question"] === "none") {
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
        let random = Math.random()
        let index = Math.floor(random*questions.length)
        setQuestion(questions[index])
        setNumQuestions(numQuestions+1)
    }

    const correctAnswer = (value) => {
        setCorrect(value)

        if (value) {
            setCorrectCount(correctCount+1)
        }

        setTotalCount(totalCount+1)

        setContinueDialog(true)
    }

    return (
        <div>
          <div>
            <div style={{ opacity: 0.7, paddingTop: "25vh", fontSize: "20pt" }}>Write the answer below</div>
            <div style={{ paddingTop: "1vh", fontSize: "50pt" }}>{question["TITLE"]}</div>
            {question["IMAGE_ID"] && <div style={{ paddingTop: "5vh" }}><img src={`imgid://${question["IMAGE_ID"]}`} style={{ height: "25vh" }} /></div>}
            {question["TYPE"] === "multi"
             ? <MultiAnswer question={question} correctAnswer={correctAnswer} />
             : <SubmitAnswer question={question} correctAnswer={correctAnswer} />
            }
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
              <Button onClick={finishButtonClick} autoFocus>Continue</Button>
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
