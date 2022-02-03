import React from 'react';
import { useHistory } from 'react-router-dom';
import { Fab, Menu, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { checkFolder, createFolder } from '../Utils/CreateFolder';
import { importItem } from '../Utils/Share'
/** 
* @function CreateListFab - A component for the drop-down allowing the user to create an item, either import a list/folder, create a folder, or create a list.
* @param {String} props.path - The current page the user has selected, this allows for creating nesting folders and creating lists immediately within folders e.g. "folder1-folder2"
* @param {Object} props.gridItems -  The object containing all lists and folders and their position within the file tree. This is used to validate the user's input, checking that the item does not exist.
* @return {JSX} - The JSX for the component. 
*/
function CreateListFab(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)   // the anchor for the drop-down menu, a boolean value of this can be taken to check if the menu is open
  const [folderDialog, setFolderDialog] = React.useState(false) // flag for if the folder creation dialog should be shown
  const [folderName, setFolderName] = React.useState("")  // string state of the name inputted to the folder creation dialog
  const [isInvalid, setIsInvalid] = React.useState(false)  // flag if the folder name is invalid
  const [errorMessage, setErrorMessage] = React.useState("") // the error message shown if the folder name is invalid

  const history = useHistory()

  const OpenMenu = (event) => {  // function that is run when the button is clicked
    setAnchorEl(event.currentTarget) // set the drop-down's anchor to the button
  }

  const handleFolderItemClick = (event) => { // function that is run when the "create folder" item is clicked in the drop-down
    setAnchorEl(null) // close the drop-down menu
    setFolderDialog(true) // open the folder creation dialog
  }

  const closeFolderDialog = () => { // function to close the folder creation dialog
    setFolderDialog(false)
  }

  const handleListItemClick = (event) => { // function that is run when the "create list" item is clicked in the drop-down
    setAnchorEl(null) // close the drop-down menu
    history.push(`/create-list/${props.path}`) // redirect the user to the create-list page, passing in where the list should be created
  }

  const handleImportItemClick = (event) => { // function run when the "import" item is clicked in the drop-down
    let value = window.electron.dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{
        name: "Compressed Zip",
        extensions: ["zip"]
      }]
    })[0] // show a file selection dialog, shared lists are stored as .zip files, and choose the first filepath that is chosen

    if (!value) { return } // return if no file is selected (this also triggers when the dialog is cancelled)

    importItem(value, props.path) // run the utility function to import files
    setAnchorEl(null)
  }

  const CloseMenu = () => { // function that is run when the drop-down menu is closed
    setAnchorEl(null);
  }

  const handleChange = (event) => { // function that handles input to the folder creation dialog and dynamically checks for errors
    let error = checkFolder(event.target.value, props.path.split("-"), props.gridItems) // check if there is an error in the inputted value using a utility function

    // if there is an error, show the error to the user
    if (error) {
      setErrorMessage(error)
      setIsInvalid(true)
    } else {
      setErrorMessage("")
      setIsInvalid(false)
    }

    setFolderName(event.target.value) // change the state variable to the new name
  }

  const cancelCreateFolder = () => { // function that is run when the folder creation dialog is cancelled, reset the states involved
    setFolderDialog(false)
    setFolderName("")
    setIsInvalid(false)
    setErrorMessage("")
  }

  const submitCreateFolder = () => { // function that is run when the folder name is submitted from the folder dialog
    if (!isInvalid) { // check if the input is valid
      createFolder(folderName, props.path.split("-")) // use a util function to create the folder
      setFolderDialog(false)
    }
  }

  return (
    <div>
      {/* BUTTON */}
      <Fab variant="extended" style={{ backgroundColor: "white", left: "17vw", position: "absolute" }} onClick={OpenMenu}>
        <AddIcon style={{ opacity: 0.7 }} />
        Create
      </Fab>

      {/* DROP-DOWN MENU */}
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
        <MenuItem key="FOLDER" style={{ width: 150, fontSize: 14 }} onClick={handleFolderItemClick}>
          FOLDER
        </MenuItem>
        <MenuItem key="LIST" style={{ width: 150, fontSize: 14 }} onClick={handleListItemClick}>
          LIST
        </MenuItem>
        <MenuItem key="IMPORT" style={{ width: 150, fontSize: 14 }} onClick={handleImportItemClick}>
          IMPORT
        </MenuItem>
      </Menu>

      {/* FOLDER CREATION DIALOG */}
      <Dialog open={folderDialog} onClose={closeFolderDialog} >
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
