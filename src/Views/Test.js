import React from 'react';
import { useLocation, useParams, Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { loadList, saveList } from '../Utils/List';
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

let questions

function Test(props) {
    const { search } = useLocation()
    const { pathStr } = useParams()
    const [loadedQuestions, setLoadedQuestions] = React.useState(false)

    const queryStr = queryString.parse(search)

    if (!loadedQuestions) {
        questions = loadList(pathStr)
        setLoadedQuestions(true)
    }

    if (queryStr["practice"] === "true") {
        questions = questions.filter(question => {
            console.log(question)
            return question["INCORRECT"] > 0
        })
    }

    const [questionIndex, setQuestionIndex] = React.useState(Math.floor(Math.random()*questions.length))
    const [time, setTime] = React.useState(1)
    const [timeDialog, setTimeDialog] = React.useState(false)
    const [continueDialog, setContinueDialog] = React.useState(false)
    const [endDialog, setEndDialog] = React.useState(false)
    const [correct, setCorrect] = React.useState(true)
    const [correctCount, setCorrectCount] = React.useState(0)
    const [totalCount, setTotalCount] = React.useState(0)

    const history = useHistory()

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
        let split = pathStr.split("-")
        let name = split.pop().split(".")[0]

        saveList(questions, name, split.join("-"))
        history.push(`/end/${pathStr}?total=${totalCount}&correct=${correctCount}`)
    }

    const finishButtonClick = () => {
        let split = pathStr.split("-")
        let name = split.pop().split(".")[0]

        saveList(questions, name, split.join("-"))
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
            return queryStr["question"] <= totalCount
        }
    }

    const handleDialogClose = () => {
        setTimeDialog(false)
        setContinueDialog(false)
    }

    const newQuestion = () => {
        let random = Math.random()
        let index = Math.floor(random*questions.length)
        setQuestionIndex(index)
    }

    const correctAnswer = (value) => {
        setCorrect(value)

        if (value) {
            setCorrectCount(correctCount+1)
            if (questions[questionIndex]["INCORRECT"] != 0) {
                questions[questionIndex]["INCORRECT"] -= 1
            }
        } else {
            if (!questions[questionIndex]["INCORRECT"]) {
                questions[questionIndex]["INCORRECT"] = 1
            } else {
                questions[questionIndex]["INCORRECT"] += 1
            }
        }


        setTotalCount(totalCount+1)

        setContinueDialog(true)
    }

    return (
        <div>
          <div>
            <div style={{ opacity: 0.7, paddingTop: "25vh", fontSize: "20pt" }}>Write the answer below</div>
            <div style={{ paddingTop: "1vh", fontSize: "50pt" }}>{questions[questionIndex]["TITLE"]}</div>
            {questions[questionIndex]["IMAGE_ID"] && <div style={{ paddingTop: "5vh" }}><img src={`imgid://${questions[questionIndex]["IMAGE_ID"]}`} style={{ height: "25vh" }} /></div>}
            {questions[questionIndex]["TYPE"] === "multi"
             ? <MultiAnswer question={questions[questionIndex]} correctAnswer={correctAnswer} />
             : <SubmitAnswer question={questions[questionIndex]} correctAnswer={correctAnswer} />
            }
          </div>

          <Dialog open={continueDialog} onClose={handleDialogClose} >
            <DialogTitle>{`${correct ? "Well Done!" : "So Close!"} Do you wish to continue?`}</DialogTitle>
            <DialogActions>
              <Button onClick={backButtonClick}>Finish</Button>
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
              <Button onClick={backButtonClick}>Finish</Button>
              <Button onClick={continueFunc} autoFocus>Continue</Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}

export default Test;
