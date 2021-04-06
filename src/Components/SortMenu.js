import React from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const sortOptions = [
    'TYPE',
    'NAME',
    'CREATED',
    'LAST USE'
]

function SortMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const OpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
        setAnchorEl(null)
        console.log(sortOptions[index])
        // TODO: Add ability to re-render folders/lists based on sorting
    }

    const CloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <div style={{backgroundColor: "white", paddingRight: "3%"}}>
            <Button variant="contained" style={{backgroundColor: "white", width: 150, height: 40, fontSize: 14}} onClick={OpenMenu}>
                <SortByAlphaIcon style={{position: "absolute", left: 10, opacity: 0.7}} />
                <p style={{textAlign: "center"}}>{sortOptions[selectedIndex]}</p>
                <ArrowLeftIcon style={{position: 'absolute', right: 10, opacity: 0.7}} />
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={CloseMenu}>
                {sortOptions.map((option, index) => (
                    <MenuItem key={option} style={{width: 150, fontSize: 14}} onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                        {(index === 0) && <ArrowDropDownIcon style={{position: 'absolute', right: 10}} />}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default SortMenu;