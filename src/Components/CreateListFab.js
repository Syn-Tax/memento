import React from 'react';
import { useHistory } from 'react-router-dom';
import { Fab, Menu, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { checkFolder, createFolder } from '../Utils/CreateFolder';

function CreateListFab(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [folderDialog, setFolderDialog] = React.useState(false)
    const [folderName, setFolderName] = React.useState("")
    const [isInvalid, setIsInvalid] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const history = useHistory()

    const OpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleFolderItemClick = (event) => {
        setAnchorEl(null)
        setFolderDialog(true)
    }

    const handleListItemClick = (event) => {
        setAnchorEl(null)
        console.log(`/create-list/${props.path}`)
        history.push(`/create-list/${props.path}`)
    }

    const CloseMenu = () => {
        setAnchorEl(null);
    }

    const handleChange = (event) => {
        let error = checkFolder(event.target.value, props.path.split("-"), props.gridItems)
        if (error) {
            setErrorMessage(error)
            setIsInvalid(true)
        } else {
            setErrorMessage("")
            setIsInvalid(false)
        }

        setFolderName(event.target.value)
    }

    const cancelCreateFolder = () => {
        setFolderDialog(false)
        setFolderName("")
        setIsInvalid(false)
        setErrorMessage("")
    }

    const submitCreateFolder = () => {
        if (!isInvalid) {
            console.log(folderName, props.path.split("-"))
            createFolder(folderName, props.path.split("-"))
            setFolderDialog(false)
        }
    }

    return (
        <div>
          <Fab variant="extended" style={{ backgroundColor: "white" }} onClick={OpenMenu}>
            <AddIcon style={{ opacity: 0.7 }} />
            Create
          </Fab>
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
            <MenuItem key="FOLDER" style={{ width: 150, fontSize: 14 }} onClick={handleFolderItemClick}>
              FOLDER
            </MenuItem>
            <MenuItem key="LIST" style={{ width: 150, fontSize: 14 }} onClick={handleListItemClick}>
              LIST
            </MenuItem>
          </Menu>

          <Dialog open={folderDialog} >
            <DialogTitle>Create Folder</DialogTitle>
            <DialogContent>
              <TextField onChange={handleChange} variant="outlined" label={isInvalid ? "Error" : "Enter Folder Name"} error={isInvalid} helperText={isInvalid ? errorMessage : ""} fullwidth />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelCreateFolder}>Cancel</Button>
              <Button onClick={submitCreateFolder}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}

export default CreateListFab;
