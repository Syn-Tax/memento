import React from 'react';
import { Fab, Menu, MenuItem } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const options = { "text": "TEXT", "multi": "CHOICE" }

/** 
* @function QuestionMenu - Menu to select the type of the question on creation
* @return {JSX} - JSX for the component
*/
function QuestionMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selected, setSelected] = React.useState(props.type ? props.type : "text")

    const openMenu = (event) => { // function that handles opening the menu
        setAnchorEl(event.currentTarget)
    }

    const handleTextItemClick = (event) => { // function that handles when the text item is clicked
        props.setValue('text')
        setSelected("text")
        closeMenu()
    }

    const handleMultiItemClick = (event) => { // function that handles when the multiple choice item is clicked
        props.setValue('multi')
        setSelected("multi")
        closeMenu()
    }

    const closeMenu = () => { // function that handles closing the menu
        setAnchorEl(null);
    }

    return (
        <div>
            <Fab variant="extended" style={{ backgroundColor: "white", width: 150 }} onClick={openMenu}>
                <TextFieldsIcon style={{ opacity: 0.7, position: "absolute", left: 20 }} />
                <p style={{ textAlign: "center" }}>{options[selected]}</p>
                <ArrowLeftIcon style={{ position: 'absolute', right: 20, opacity: 0.7 }} />
            </Fab>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
                <MenuItem style={{ width: 150, fontSize: 14 }} onClick={handleTextItemClick}>
                    {options["text"]}
                </MenuItem>
                <MenuItem style={{ width: 150, fontSize: 14 }} onClick={handleMultiItemClick}>
                    {options["multi"]}
                </MenuItem>
            </Menu>
        </div>
    );
}

export default QuestionMenu;
