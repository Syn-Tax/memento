import React from 'react';
import queryString from 'query-string'
import { useParams, Link, useLocation } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { checkFolder } from '../Utils/CreateFolder';
import { saveList, loadList } from '../Utils/List';
import BackButton from '../Components/BackButton';
import SaveButton from '../Components/SaveButton';
import CreateQuestion from '../Components/CreateQuestion';
import CreateQuestionFab from '../Components/CreateQuestionFab';

/** 
* @function CreateList - page that allows the user to create and edit lists
* @return {JSX} - the JSX for the component
*/
function CreateList(props) {
    // initialise all of the states/hooks
    const { pathStr } = useParams()
    const { search } = useLocation()
    const [questions, setQuestions] = React.useState([])
    const [loadedQuestions, setLoadedQuestions] = React.useState(false)
    const [invalidName, setInvalidName] = React.useState(false)
    const [name, setName] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")

    // load the questions and set other states 
    let queryStr = queryString.parse(search)

    if (queryStr["edit"] === "true") {
        queryStr["edit"] = true
    } else if (queryStr["edit"] === "false") {
        queryStr["edit"] === false
    }

    if (!loadedQuestions && queryStr["edit"]) {
        let qs
        if (pathStr === "Home") {
            qs = loadList(queryStr["list"])
        } else {
            qs = loadList(pathStr + queryStr["list"])
        }
        setQuestions(qs)
        setName(queryStr["list"].substring(0, queryStr["list"].length - 5))
        setLoadedQuestions(true)
    }

    const onSave = (event) => { // function that handles when the list is saved
        event.preventDefault()
        saveList(questions, name, pathStr)
    }

    const nameChange = (event) => { // function that handles when the name of the list is changed
        let error = checkFolder(event.target.value, pathStr.split("-"), props.gridItems) // check if the name is valid

        if (error) { // if there is an error show the error to the user
            setErrorMessage(error)
            setInvalidName(true)
        } else {
            setErrorMessage("")
            setInvalidName(false)
        }
        setName(event.target.value) // otherwise set the same state to the new value
    }

    const newItem = () => { // function that handles when a new question is added
        let qs = questions // copy the questions to a new variable
        qs.push({ "TITLE": "", "TYPE": "text", "ANSWERS": [""], "CORRECT": 0 }) // add the new question to it
        setQuestions([...qs]) // set the questions as a new variable since react won't update the page when references are used
    }

    const addAnswer = (index) => { // function that handles when a new answer is added (very similar to the newItem function)
        let qs = questions
        qs[index]["ANSWERS"].push("")
        setQuestions([...qs])
    }

    const removeAnswer = (index) => { // function that handles when an answer is removed
        let qs = questions
        if (qs[index]["ANSWERS"].length > 1) { // only remove an answer when there is more than one so that there must always be one answer
            qs[index]["ANSWERS"].pop()
        }
        setQuestions([...qs])
    }

    const deleteQuestion = (index) => { // function that handles deleting a question
        let qs = questions
        qs.splice(index, 1)
        setQuestions([...qs])
    }

    const titleChange = (index, event) => { // function that handles when the title of a question is changed (i.e. the question itself)
        let qs = questions
        qs[index]["TITLE"] = event.target.value
        setQuestions([...qs])
    }

    const answerChange = (questionIndex, answerIndex, event) => { // function that handles when an answer is changed
        let qs = questions
        qs[questionIndex]["ANSWERS"][answerIndex] = event.target.value
        setQuestions([...qs])
    }

    const setCorrect = (questionIndex, correctIndex) => { // function that sets the correct index of a multiple choice question
        let qs = questions
        qs[questionIndex]["CORRECT"] = correctIndex
        setQuestions([...qs])
    }

    const setType = (questionIndex, type) => { // function that sets the type of the question
        let qs = questions
        qs[questionIndex]["TYPE"] = type
        setQuestions([...qs])
    }

    const setImage = (questionIndex, id, name) => { // function that sets the image associated with the question
        console.log(name, id)
        let qs = questions
        qs[questionIndex]["IMAGE_ID"] = id
        qs[questionIndex]["IMAGE_NAME"] = name
        setQuestions([...qs])
    }

    return (
        <div>
            <Link to={pathStr === "Home" ? "/" : `/folder/${pathStr}`}><BackButton /></Link>
            <form onSubmit={onSave} style={{ paddingTop: "5%" }}>
                <SaveButton />
                <TextField onChange={nameChange} value={name} variant="outlined" label={invalidName ? "Error" : "Name"} error={invalidName} helperText={invalidName ? errorMessage : ""} style={{ width: "25%" }} />

                {questions.map((question, i) => {
                    return <CreateQuestion question={question} setImage={(id, name) => (setImage(i, id, name))} addAnswer={() => (addAnswer(i))} removeAnswer={() => (removeAnswer(i))} deleteQuestion={() => (deleteQuestion(i))} titleChange={(e) => (titleChange(i, e))} answerChange={(j, e) => (answerChange(i, j, e))} setCorrect={(j) => (setCorrect(i, j))} setType={(t) => (setType(i, t))} />
                })}

                <CreateQuestionFab onClick={newItem} />

            </form>
        </div>
    )
}

export default CreateList;
