import { Box, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

function BackButton() {
    return (
        <Fab type="sumbit" variant="extended" size="small" style={{ backgroundColor: "white", top: "2%", right: "5%", position: "absolute" }}>
            <SaveIcon style={{opacity: 0.7}} />
            Save
        </Fab>
    )
}

export default BackButton;