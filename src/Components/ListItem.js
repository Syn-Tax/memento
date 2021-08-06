import { Box, Menu, MenuItem, IconButton } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function ListItem(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const colors = {"Folder": "#548BDF",
                    "List": "#F6D57E"}

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    return (
        <div>
          <Link to={`/${props.type.toLowerCase()}/${props.path}`}>
            <Box boxShadow={3} style={{ width: '17%', height: '100%', backgroundColor: colors[props.type], borderRadius: 4, position: "absolute" }}>
              <Box style={{ width: '70%', height: '20%', backgroundColor: "white", position: "absolute", top: "10%" }} >
                <span style={{ fontFamily: "Roboto", fontSize: "17pt", top: "-4%", position: "absolute", whiteSpace: "nowrap", left: "20%" }} >
                  {props.name}
                </span>
              </Box>
              <Box style={{ width: '3.18vh', height: '3.18vh', backgroundColor: "white", position: "absolute", top: "10%", left: "70%", borderBottomRightRadius: "50%", borderTopRightRadius: "50%" }} ></Box>
        <IconButton onClick={openMenu} style={{ position: "absolute", right: 0, top: 0 }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Link>

          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem style={{ width: 150, fontSize: 14 }}>
              EDIT
            </MenuItem>
          </Menu>
        </div>
    );
}

export default ListItem;
