import { Grid } from '@material-ui/core';
import ListItem from './ListItem';

function ListGrid() {
    return (
        <Grid container spacing={3} style={{ top: "35%", position: "absolute" }}>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}><ListItem type="Folder" name="Folder" onClick={() => console.log("test")} /></Grid>
            <Grid item xs={3}><ListItem type="List" name="List 1" /></Grid>
            <Grid item xs={3}><ListItem type="List" name="List 2" /></Grid>
        </Grid>
    );
}

export default ListGrid;