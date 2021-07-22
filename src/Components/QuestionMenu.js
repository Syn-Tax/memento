import React from 'react';
import { Fab, Menu, MenuItem } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const options = {"text": "TEXT", "image": "IMAGE", "mixed": "BOTH"}

function QuestionMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selected, setSelected] = React.useState("text")

    const OpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleTextItemClick = (event) => {
        setAnchorEl(null)
        props.setValue('text')
        setSelected("text")
    }

    const handleImageItemClick = (event) => {
        setAnchorEl(null)
        props.setValue('image')
        setSelected("image")
    }

    const handleMixedItemClick = (event) => {
        setAnchorEl(null)
        props.setValue('mixed')
        setSelected("mixed")
    }

    const CloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <Fab variant="extended" style={{ backgroundColor: "white", width: 150 }} onClick={OpenMenu}>
                <TextFieldsIcon style={{ opacity: 0.7, position: "absolute", left: 20 }} />
                <p style={{ textAlign: "center" }}>{options[selected]}</p>
                <ArrowLeftIcon style={{position: 'absolute', right: 20, opacity: 0.7}} />
            </Fab>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
                <MenuItem style={{ width: 150, fontSize: 14 }} onClick={handleTextItemClick}>
                    {options["text"]}
                </MenuItem>
                <MenuItem style={{ width: 150, fontSize: 14 }} onClick={handleImageItemClick}>
                    {options["image"]}
                </MenuItem>
                <MenuItem style={{ width: 150, fontSize: 14 }} onClick={handleMixedItemClick}>
                    {options["mixed"]}
                </MenuItem>
            </Menu>
        </div>
    );
}

export default QuestionMenu;
