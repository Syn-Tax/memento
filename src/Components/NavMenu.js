import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    listIcon: {
        paddingLeft: "25%",
        paddingTop: "2%"
    },
    listText: {
        paddingLeft: "8%",
        paddingTop: "2%"
    }
})

const sortMethod = "NAME"

function NavMenu(props) {
    // const [selectedItem, setSelectedItem] = React.useState(0);
    const classes = styles()

    props.lists.sort((a, b) => ((a[sortMethod] < b[sortMethod]) ? -1 : (a[sortMethod] > b[sortMethod]) ? 1 : 0))

    let lists = []

    for (let i=0; i<props.lists.length; i++) {
        if (props.lists[i]["TYPE"] === 'Folder') {
            lists.push(props.lists[i])
        }
    }

    return (
        <div>
            <Box boxShadow={3} width={"100%"} style={{ backgroundColor: "white", top: 0, height: "100%", position: "fixed", left: 0 }} ></Box>
            <List style={{ paddingTop: "2%"  }}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon className={classes.listIcon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" className={classes.listText} />
                </ListItem>
                <Divider />
                <Typography variant="h6" style={{ paddingTop: "2%" }} >Folders</Typography>
                {lists.map((list, i) => (
                    <ListItem button component={Link} to={`/folder/${list["PATH"]}`}>
                        <ListItemIcon className={classes.listIcon}>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={list["NAME"]} className={classes.listText} />
                    </ListItem>
                ))}
                <Divider />
                <ListItem button component={Link} to="/about">
                    <ListItemIcon className={classes.listIcon}>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" className={classes.listText} />
                </ListItem>
            </List>
        </div>
    )
}

export default NavMenu;
