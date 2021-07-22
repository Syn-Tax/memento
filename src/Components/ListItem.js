import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


function ListItem(props) {
    const colors = {"Folder": "#548BDF",
                    "List": "#F6D57E"}

    return (
        <div>
            <Link to={`/${props.type.toLowerCase()}/${props.path}`}>
                <Box boxShadow={3} style={{ width: '17%', height: '100%', backgroundColor: colors[props.type], borderRadius: 4, position: "absolute" }}>
                    <Box style={{ width: '70%', height: '20%', backgroundColor: "white", position: "absolute", top: "10%" }} >
                        <span style={{ fontFamily: "Roboto", fontSize: "17pt", top: "-4%", position: "absolute", whiteSpace: "nowrap", left: "20%" }} >
                            {props.name}
                        </span>
                    </Box>
                    <Box style={{ width: '3.15vh', height: '3.18vh', backgroundColor: "white", position: "absolute", top: "10%", left: "70%", borderBottomRightRadius: "50%", borderTopRightRadius: "50%" }} ></Box>
                </Box>
            </Link>
        </div>
    );
}

export default ListItem;
