import { Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

/** 
* @function SaveButton - The same as the back button but for saving created/edited lists
* @return {JSX} - The JSX for the component
*/
function SaveButton() {
    return (
        <Fab type="sumbit" variant="extended" size="small" style={{ backgroundColor: "white", top: "2%", right: "5%", position: "absolute" }}>
            <SaveIcon style={{ opacity: 0.7 }} />
            Save
        </Fab>
    )
}

export default SaveButton;
