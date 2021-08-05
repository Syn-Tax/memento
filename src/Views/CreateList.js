import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { checkFolder } from '../Utils/CreateFolder';
import { saveList } from '../Utils/List';
import BackButton from '../Components/BackButton';
import SaveButton from '../Components/SaveButton';
import CreateQuestion from '../Components/CreateQuestion';
import CreateQuestionFab from '../Components/CreateQuestionFab';

function CreateList(props) {
    const { pathStr } = useParams()
    const [ questions, setQuestions ] = React.useState([])
    const [ invalidName, setInvalidName ] = React.useState(false)
    const [ name, setName ] = React.useState("")
    const [ errorMessage, setErrorMessage ] = React.useState("")

    const onSave = (event) => {
        event.preventDefault()
        saveList(questions, name, pathStr)
    }

    const nameChange = (event) => {
        let error = checkFolder(event.target.value, pathStr.split("-"), props.gridItems)
        if (error) {
            setErrorMessage(error)
            setInvalidName(true)
        } else {
            setErrorMessage("")
            setInvalidName(false)
        }
        setName(event.target.value)
    }

    const newItem = () =>{
        let qs = questions
        qs.push({"TITLE": "", "TYPE": "text", "ANSWERS": [""], "CORRECT": 0})
        setQuestions([...qs])
        console.log(questions)
    }

    const addAnswer = (index) => {
        let qs = questions
        qs[index]["ANSWERS"].push("")
        setQuestions([...qs])
    }

    const removeAnswer = (index) => {
        let qs = questions
        if (qs[index]["ANSWERS"].length > 1) {
            qs[index]["ANSWERS"].pop()
        }
        setQuestions([...qs])
    }
    
    const deleteQuestion = (index) => {
        let qs = questions
        qs.splice(index)
        setQuestions([...qs])
    }

    const titleChange = (index, event) => {
        let qs = questions
        qs[index]["TITLE"] = event.target.value
        setQuestions([...qs])
    }
    
    const answerChange = (questionIndex, answerIndex, event) => {
        let qs = questions
        qs[questionIndex]["ANSWERS"][answerIndex] = event.target.value
        setQuestions([...qs])
    }

    const setCorrect = (questionIndex, correctIndex) => {
        let qs = questions
        qs[questionIndex]["CORRECT"] = correctIndex
        setQuestions([...qs])
    }

    const setType = (questionIndex, type) => {
        let qs = questions
        qs[questionIndex]["TYPE"] = type
        setQuestions([...qs])
    }

    const setImage = (questionIndex, id, name) => {
        console.log(name, id)
        let qs = questions
        qs[questionIndex]["IMAGE_ID"] = id
        qs[questionIndex]["IMAGE_NAME"] = name
        setQuestions([...qs])
    }

    return (
        <div>
            <Link to={pathStr==="Home" ? "/" : `/folder/${pathStr}`}><BackButton /></Link>
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
