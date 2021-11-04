import React from 'react';
import { Menu, MenuItem, Fab } from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Sorting option that will be shown to the user
const sortOptions = [
    'TYPE',
    'NAME'
]

/** 
* @function SortMenu - Drop-down menu for the user to select which property to sort by
* @param {Function} props.changeState - Set the sort option in the parent component
* @return {JSX} - The JSX for the component
*/
function SortMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null) // anchor for the drop-down menu
    const [selectedIndex, setSelectedIndex] = React.useState(0) // state for the selected item

    const openMenu = (event) => { // function that handles opening the menu
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (event, index) => { // function that handles when an item is selected
        setSelectedIndex(index)
        props.changeState(sortOptions[index])
        closeMenu()
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    return (
        <div style={{ backgroundColor: "white", paddingRight: "3%" }}>
            <Fab variant="extended" style={{ backgroundColor: "white", width: 150, fontSize: 14 }} onClick={openMenu}>
                <SortByAlphaIcon style={{ position: "absolute", left: 10, opacity: 0.7 }} />
                <p style={{ textAlign: "center" }}>{sortOptions[selectedIndex]}</p>
                <ArrowLeftIcon style={{ position: 'absolute', right: 10, opacity: 0.7 }} />
            </Fab>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
                {sortOptions.map((option, index) => (
                    <MenuItem key={option} style={{ width: 150, fontSize: 14 }} onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                        {(index === 0) && <ArrowDropDownIcon style={{ position: 'absolute', right: 10 }} />}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default SortMenu;
