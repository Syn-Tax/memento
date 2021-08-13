import { Box, Menu, MenuItem, IconButton, Tooltip, Fade } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { share } from '../Utils/Share'

const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

function getPath(path, lists, parent) {

    if (path.length === 0) {
        return {lists, parent}
    }

    for (let i=0; i<lists.length; i++) {
        let item = lists[i]
        if (!item["PATH"]) {
            continue
        }
        let pth = item["PATH"].split("-")
        if (pth[pth.length-1] === path[0]) {

            path.shift()
            pth.pop()

            return getPath(path, item["CONTAINS"], pth.join("-"))
        }
    }
}

function ListItem(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const colors = {"Folder": "#548BDF",
                    "List": "#F6D57E"}

    const history = useHistory()

    const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/")

    let itemPath

    if (props.pth) {
        itemPath = props.pth+"-"+props.path
    } else {
        itemPath = props.path
    }

    const openMenu = (event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const openMenuItem = () => {
        history.push(`/${props.type.toLowerCase()}/${props.path}`)
    }

    const editMenuItem = () => {
        let pth, name
        let split = props.path.split("-")

        if (split.length === 1) {
            name = props.path
            pth = "Home"
        } else {
            name = split.pop()
            pth = split.join("-")
        }
        console.log(name, pth)
        history.push(`/create-list/${pth}?edit=true&list=${name}`)
    }

    const deleteMenuItem = () => {
        if (props.type === "List") {
            let split = props.path.split("-")
            let pth = path.join(dataFolder, split.join("/"))
            fs.unlinkSync(pth)
            console.log("deleted: ", pth)
        } else if (props.type === "Folder") {
            let split = props.path.split("-")
            let pth = path.join(dataFolder, split.join("/"))
            fs.rmdirSync(pth, { recursive: true })
            console.log("deleted: ", pth)
        }
    }

    const moveMenuItem = () => {
        let split = props.pth.split('-')

        let folderSplit = props.parent_path.split('-')

        let parentPth = [...folderSplit]
        parentPth.pop()
        parentPth.pop()

        let parent = getPath(props.parent_path, props.gridItems, parentPth)

        let oldpath
        let newpath

        if (props.type === "List") {
            oldpath = path.join(dataFolder, split.join('/'), props.path)
            newpath = path.join(dataFolder, folderSplit.join('/'), props.path)
        } else {
            oldpath = path.join(dataFolder, split.join('/'), props.path)
            newpath = path.join(dataFolder, folderSplit.join('/'), props.path)
        }

        fs.rename(oldpath, newpath, (err) => {
            if (err) throw err
            console.log(`${oldpath} moved to ${newpath}`)
        })
    }

    const practiceMenuItem = () => {
        history.push(`/${props.type.toLowerCase()}/${itemPath}?practice=true`)
    }

    const shareMenuItem = () => {
        let value = window.electron.dialog.showSaveDialogSync({filters: [{name: "Compressed Zip", extensions: ["zip"]}]})

        if (!value) {
            return
        } else {
            share(itemPath, value, props.type)
        }
    }

    const [{isDragging}, drag] = useDrag({
        item: {
            type: props.type,
            id: props.path,
            name: props.name
        },
        type: props.type,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const [{isOver}, drop] = useDrop({
        accept: ['List', 'Folder'],
        drop: (item, monitor) => (props.handleMove(item, monitor, props.path, props.name)),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <div ref={drop}>
          <Link to={`/${props.type.toLowerCase()}/${itemPath}?practice=false`}>
            <Tooltip title={props.name} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow>
              <Box ref={drag} boxShadow={3} style={{ width: '13vw', height: '100%', backgroundColor: colors[props.type], borderRadius: 4, position: "absolute" }}>
                <Box style={{ width: '70%', height: '20%', backgroundColor: "white", position: "absolute", top: "10%" }} >
                  <span  style={{ fontFamily: "Roboto", fontSize: "17pt", top: "-4%", color: "black", position: "absolute", whiteSpace: "nowrap", overflow: "hidden", left: "1vw", width: "8vw", textOverflow: "ellipsis" }} >
                    {props.name}
                  </span>
                </Box>
                <Box style={{ width: '3.18vh', height: '3.18vh', backgroundColor: "white", position: "absolute", top: "10%", left: "70%", borderBottomRightRadius: "50%", borderTopRightRadius: "50%" }} ></Box>
                <IconButton onClick={openMenu} style={{ position: "absolute", right: "-5%", top: "5%" }}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Link>

          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem style={{ width: 100, fontSize: 14 }} onClick={openMenuItem}>
              OPEN
            </MenuItem>
            {props.type==="List" &&
            <MenuItem style={{ width: 100, fontSize: 14 }} onClick={editMenuItem}>
              EDIT
            </MenuItem>
            }
            {props.type==="List" &&
            <MenuItem style={{ width: 100, fontSize: 14 }} onClick={practiceMenuItem}>
              PRACTICE
            </MenuItem>
            }
            <MenuItem style={{ width: 100, fontSize: 14 }} onClick={moveMenuItem}>
              MOVE BACK
            </MenuItem>
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
