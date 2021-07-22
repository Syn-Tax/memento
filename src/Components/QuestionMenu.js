import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Link, useHistory } from 'react-router-dom';
import { Fab, Menu, MenuItem } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
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

const options = {"text": "TEXT", "image": "IMAGE", "mixed": "BOTH"}

function QuestionMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selected, setSelected] = React.useState("text")
    const classes = styles()
    const history = useHistory()

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
