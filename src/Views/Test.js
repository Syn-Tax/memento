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

const timeLimits = {"slow": 20,
                    "medium": 15,
                    "fast": 10,
                    "eat_my_dust": 5}

let questions

function Test(props) {
    const { search } = useLocation()
    const { pathStr } = useParams()
    const history = useHistory()
    const [loadedQuestions, setLoadedQuestions] = React.useState(false)
    const [correctCount, setCorrectCount] = React.useState(0)
    const [totalCount, setTotalCount] = React.useState(0)

    const queryStr = queryString.parse(search)

    if (!loadedQuestions) {
        questions = loadList(pathStr)
        setLoadedQuestions(true)
    }

    if (queryStr["practice"] === "true") {
        questions = questions.filter(question => {
            return question["INCORRECT"] > 0
        })
        if (questions.length < 1) {
            let split = pathStr.split("-")
            let name = split.pop().split(".")[0]

            saveList(questions, name, split.join("-"))
            history.push(`/end/${pathStr}?total=${totalCount}&correct=${correctCount}`)
        }
    }


    const [questionIndex, setQuestionIndex] = React.useState(Math.floor(Math.random()*questions.length))
    const [time, setTime] = React.useState(1)
    const [timeDialog, setTimeDialog] = React.useState(false)
    const [continueDialog, setContinueDialog] = React.useState(false)
    const [endDialog, setEndDialog] = React.useState(false)
    const [correct, setCorrect] = React.useState(true)
    const [timerActive, setTimerActive] = React.useState(true)

    if (questionIndex >= questions.length) {
        let split = pathStr.split("-")
        let name = split.pop().split(".")[0]

        saveList(questions, name, split.join("-"))
        history.push(`/end/${pathStr}?total=${totalCount}&correct=${correctCount}`)
    }

    let parent_path

    if (pathStr.split("-").length > 1) {
        parent_path = "/folder/" + pathStr.split("-").slice(0, -1).join("-")
    } else {
        parent_path = "/"
    }

    React.useEffect(() => {
        let interval = null
        if (timerActive) {
            interval = setTimeout(() => incrementTime(), 5000);
        } else if (!timerActive && time !== 0) {
            clearInterval(interval)
        }
        return () => {
            clearTimeout(interval);
        };
    }, [timerActive, time]); // eslint-disable-line

    const resetTime = () => {
        setTimerActive(false)
        setTime(0)
    }

    const incrementTime = () => {
        if (queryStr["speed"] !== 1) {
            setTime(time + 5)

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
        setTimerActive(true)
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
          {questions[questionIndex] &&
           <div>
             <div style={{ opacity: 0.7, paddingTop: "25vh", fontSize: "20pt" }}>Write the answer below</div>
             <div style={{ paddingTop: "1vh", fontSize: "50pt" }}>{questions[questionIndex]["TITLE"]}</div>
             {questions[questionIndex]["IMAGE_ID"] && <div style={{ paddingTop: "5vh" }}><img src={`imgid://${questions[questionIndex]["IMAGE_ID"]}`} style={{ height: "25vh" }} /></div>}
             {questions[questionIndex]["TYPE"] === "multi"
              ? <MultiAnswer question={questions[questionIndex]} correctAnswer={correctAnswer} />
              : <SubmitAnswer question={questions[questionIndex]} correctAnswer={correctAnswer} />
             }
           </div>
          }

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
