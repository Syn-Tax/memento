import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Link, useHistory } from 'react-router-dom';
import { Fab, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import '../Css/tailwind.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    menu: {
        backgroundColor: "white",
        width: "50vh",
        height: "50vh",
        top: 0,
        left: 0
    }
})

function CreateListFab(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [showMenu, setShowMenu] = React.useState(false)
    const classes = styles()
    const history = useHistory()

    const OpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleFolderItemClick = (event) => {
        setAnchorEl(null)
        console.log(`/create-folder/${props.path}`)
        history.push(`/create-folder/${props.path}`)
    }

    const handleListItemClick = (event) => {
        setAnchorEl(null)
        console.log(`/create-list/${props.path}`)
        history.push(`/create-list/${props.path}`)
    }

    const CloseMenu = () => {
        setAnchorEl(null);
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

        </div>
    );
}

export default CreateListFab;