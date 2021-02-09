import MenuIcon from '@material-ui/icons/Menu';
import ChevronRight from '@material-ui/icons/ChevronRight'
import { Paper, Grid, Box, Button, makeStyles, IconButton, colors } from '@material-ui/core';

function Welcome() {
    return (
        <div style={{width: "100%", height: "25%", backgroundColor: "#548BDF", zIndex: 0, position: 'absolute'}}>
            <p style={{paddingTop: "4%", fontSize: 50, color: 'white', fontFamily: 'Roboto'}}>Welcome Back</p>
        </div>
    );
}

export default Welcome;