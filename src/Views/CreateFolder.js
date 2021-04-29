import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { checkFolder, createFolder } from '../Utils/CreateFolder';
import BackButton from '../Components/BackButton';


function CreateFolder(props) {
    const [isInvalid, setIsInvalid] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const { pathStr } = useParams()
    const history = useHistory()

    const handleSubmit = (event) => {
        // console.log(event.target["0"].value)
        event.preventDefault()
        if (!isInvalid) {
            createFolder(event.target["0"].value, pathStr.split("-"))
            if (pathStr == "Home") {
                history.push("/")
            } else {
                history.push(`/folder/${pathStr}`)
            }
        }
    }

    const handleChange = (event) => {
        let error = checkFolder(event.target.value, pathStr.split("-"), props.gridItems)
        if (error) {
            setErrorMessage(error)
            setIsInvalid(true)
        } else {
            setErrorMessage("")
            setIsInvalid(false)
        }
    }

    return (
        <div>
            <div style={{ paddingTop: "2%" }}><Link to={pathStr=="Home" ? "/" : `/folder/${pathStr}`}><BackButton /></Link>Enter Folder Name</div>
            <form style={{ paddingTop: "5%" }} onSubmit={handleSubmit} >
                <TextField onChange={handleChange} variant="outlined" label={isInvalid ? "Error" : "Enter Folder Name"} error={isInvalid} helperText={isInvalid ? errorMessage : ""} style={{ position: 'relative', width: "25%" }} />
                <Button variant="contained" type="submit" style={{ position: 'absolute', top: "20%", left: "47.5%" }} >Save</Button>
            </form>
        </div>
    )
}

export default CreateFolder;