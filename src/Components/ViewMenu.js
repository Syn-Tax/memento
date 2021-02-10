import React from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const viewOptions = [
    'CARDS',
    'LIST',
    'DETAILS'
]

function ViewMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const OpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
        setAnchorEl(null)
        // TODO: Add ability to re-render folders/lists based on view preference
    }

    const CloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <div style={{backgroundColor: "white", paddingLeft: "3%"}}>
            <Button variant="contained" style={{backgroundColor: "white", width: 150, height: 40, fontSize: 14}} onClick={OpenMenu}>
                <ViewColumnIcon style={{position: "absolute", left: 10, opacity: 0.7}} />
                <p style={{textAlign: "center"}}>{viewOptions[selectedIndex]}</p>
                <ArrowLeftIcon style={{position: 'absolute', right: 10, opacity: 0.7}} />
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
                {viewOptions.map((option, index) => (
                    <MenuItem key={option} style={{width: 150, fontSize: 14}} onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                        {(index === 0) && <ArrowDropDownIcon style={{position: 'absolute', right: 10, opacity: 0.7}} />}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default ViewMenu;