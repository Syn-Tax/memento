import React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { checkFolder } from '../Utils/CreateFolder';
import BackButton from '../Components/BackButton';
import SaveButton from '../Components/SaveButton';

function CreateList(props) {
    const { pathStr } = useParams()
    const [ questions, setQuestions ] = React.useState([])
    const [ invalidName, setInvalidName ] = React.useState(false)
    const [ errorMessage, setErrorMessage ] = React.useState("")

    const onSave = (event) => {
        console.log(event)
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
    }

    return (
        <div>
            <Link to={pathStr=="Home" ? "/" : `/folder/${pathStr}`}><BackButton /></Link>
            <form onSubmit={onSave} style={{ paddingTop: "5%" }}>
                <SaveButton />
                <TextField onChange={nameChange} variant="outlined" label={invalidName ? "Error" : "Name"} error={invalidName} helperText={invalidName ? errorMessage : ""} style={{ width: "25%" }} />
            </form>
        </div>
    )
}

export default CreateList;