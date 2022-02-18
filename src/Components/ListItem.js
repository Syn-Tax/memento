import { Box, Menu, MenuItem, IconButton, Tooltip, Fade } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { share } from '../Utils/Share'

const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

/** 
* @function ListItem - Component for each item shown in the file-browser type view
* @param {String} props.path - The path to the current folder
* @param {String} props.pth - Another path variable
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/
function ListItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null) // set the anchor of the drop-down menu

  const colors = { // the colors of the type of item
    "Folder": "#548BDF", // blue
    "List": "#F6D57E" // yellow
  }

  const history = useHistory()

  const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/") // get the local folder where the data is stored

  // set the path of the current item
  let itemPath

  if (props.pth) {
    itemPath = props.pth + "-" + props.path
  } else {
    itemPath = props.path
  }

  const openMenu = (event) => { // function that handles the opening of the menu
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => { // function that handles the closing of the menu
    setAnchorEl(null)
  }

  const openMenuItem = () => { // function that handles when an item is clicked, redirecting to the url of that item (entering the folder or testing for the list)
    history.push(`/${props.type.toLowerCase()}/${itemPath}${props.type === "List" ? "?practice=false" : ""}`)
  }

  const editMenuItem = () => { // function that handles when the edit item of the drop-down is clicked
    let pth, name
    let split = props.path.split("-")

    // format the path array to a url
    if (split.length === 1) {
      name = props.path
      pth = "Home"
    } else {
      name = split.pop()
      pth = split.join("-")
    }

    history.push(`/create-list/${pth}?edit=true&list=${name}`) // redirect the user to the edit page
  }

  const deleteMenuItem = () => { // function that handles deleting items

    if (props.type === "List") {
      let split = itemPath.split("-")
      console.log(split)
      let pth = path.join(dataFolder, split.join("/"))
      fs.unlink(pth, (err) => { // delete the file with path "pth"
        if (err) throw err
      })
    } else if (props.type === "Folder") {
      let split = props.path.split("-")
      let pth = path.join(dataFolder, split.join("/"))
      fs.rmdir(pth, { recursive: true }, (err) => { // delete the folder with path "pth"
        if (err) throw err
      })
    }
    closeMenu() // close the menu
  }

  const moveMenuItem = () => { // function that handles moving the item up one directory level (i.e. mv .. in unix based systems)
    // get the current and new path of the item
    let split = props.pth.split('-')

    console.log(props.parent_path)

    let folderSplit = props.parent_path.split('/')

    console.log(folderSplit)

    folderSplit.shift()
    folderSplit.shift()

    console.log(folderSplit)

    let oldpath
    let newpath

    if (props.type === "List") {
      oldpath = path.join(dataFolder, split.join('/'), props.path)
      newpath = path.join(dataFolder, folderSplit.join('/'), props.path)
    } else {
      oldpath = path.join(dataFolder, split.join('/'), props.path)
      newpath = path.join(dataFolder, folderSplit.join('/'), props.path)
    }

    // move the item from the old path to the new path
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err
      console.log(`${oldpath} moved to ${newpath}`)
    })

    closeMenu() // close the menu
  }

  const practiceMenuItem = () => { // redirect the user to the testing screen with the practice flag set to true
    history.push(`/${props.type.toLowerCase()}/${itemPath}?practice=true`)
  }

  const shareMenuItem = () => { // function that handles sharing items
    // get file path to save the compressed file to
    let value = window.electron.dialog.showSaveDialogSync({
      filters: [{
        name: "Compressed Zip",
        extensions: ["zip"]
      }]
    })

    if (!value) { // if the user did not choose a path, return
      return
    } else { // otherwise run the sharing utility function
      share(itemPath, value, props.type)
    }
    closeMenu() // close the menu
  }

  const [{ isDragging }, drag] = useDrag({ // function that handles dragging items
    item: {
      type: props.type,
      id: itemPath,
      name: props.name
    },
    type: props.type,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const [{ isOver }, drop] = useDrop({ // function that handles dropping items into folders
    accept: ['List', 'Folder'],
    drop: (item, monitor) => (props.handleMove(item, monitor, props.path, props.name, props.pth)),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div ref={drop}>
      {/* item itself */}
      <Link to={`/${props.type.toLowerCase()}/${itemPath}${props.type === "List" ? "?practice=false" : ""}`}>
        <Tooltip title={props.name} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow>
          <Box ref={drag} boxShadow={3} style={{ width: '13vw', height: '100%', backgroundColor: colors[props.type], borderRadius: 4, position: "absolute" }}>
            <Box style={{ width: '70%', height: '20%', backgroundColor: "white", position: "absolute", top: "10%" }} >
              <span style={{ fontFamily: "Roboto", fontSize: "17pt", top: "-4%", color: "black", position: "absolute", whiteSpace: "nowrap", overflow: "hidden", left: "1vw", width: "8vw", textOverflow: "ellipsis" }} >
                {props.name}
              </span>
            </Box>
            <Box style={{ width: '3.19vh', height: '3.19vh', backgroundColor: "white", position: "absolute", top: "10%", left: "70%", borderBottomRightRadius: "50%", borderTopRightRadius: "50%" }} ></Box>
            <IconButton onClick={openMenu} style={{ position: "absolute", right: "-5%", top: "5%" }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Tooltip>
      </Link>

      {/* triple dot drop-down menu */}
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem style={{ width: 100, fontSize: 14 }} onClick={openMenuItem}>
          OPEN
        </MenuItem>
        {props.type === "List" &&
          <MenuItem style={{ width: 100, fontSize: 14 }} onClick={editMenuItem}>
            EDIT
          </MenuItem>
        }
        {props.type === "List" &&
          <MenuItem style={{ width: 100, fontSize: 14 }} onClick={practiceMenuItem}>
            PRACTICE
          </MenuItem>
        }
        {props.pth &&
          <MenuItem style={{ width: 100, fontSize: 14 }} onClick={moveMenuItem}>
            MOVE BACK
          </MenuItem>
        }
        <MenuItem style={{ width: 100, fontSize: 14 }} onClick={deleteMenuItem}>
          DELETE
        </MenuItem>
        <MenuItem style={{ width: 100, fontSize: 14 }} onClick={shareMenuItem}>
          SHARE
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ListItem;
