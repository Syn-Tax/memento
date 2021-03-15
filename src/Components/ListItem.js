import { Box } from '@material-ui/core';
import React, { useState } from 'react';


function ListItem(props) {
    const colors = {"Folder": "#548BDF",
                    "List": "#F6D57E"}

    const [bounds, setBounds] = useState([window.innerWidth, window.innerHeight])


    window.addEventListener("resize", () => {
        setBounds([window.innerWidth, window.innerHeight])
    })

    return (
        <Box onClick={props.onClick} boxShadow={3} style={{ width: bounds[0]*0.17, height: bounds[1]*0.16, backgroundColor: colors[props.type], borderRadius: 4, position: "absolute" }}>
            <Box style={{ width: bounds[0]*0.17*0.7, height: bounds[1]*0.16*0.2, backgroundColor: "white", position: "absolute", top: "10%" }} >
                <span style={{ fontFamily: "Roboto", fontSize: 17, top: bounds[1]*0.16*0.2*0.2, position: "absolute" }} >
                    {props.name}
                </span>
            </Box>
            <Box style={{ width: bounds[1]*0.16*0.2, height: bounds[1]*0.16*0.2, backgroundColor: "white", position: "absolute", top: "10%", left: "70%", borderBottomRightRadius: "50%", borderTopRightRadius: "50%" }} ></Box>
        </Box>
    );
}

export default ListItem;