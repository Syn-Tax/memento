import { Fab } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function BackButton() {
    return (
        <Fab variant="extended" size="small" style={{ backgroundColor: "white", top: "2%", left: "5%", position: "absolute" }}>
            <ArrowBackIcon style={{opacity: 0.7}} />
            Back
        </Fab>
    )
}

export default BackButton;
