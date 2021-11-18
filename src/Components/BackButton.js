import { Fab } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

/** 
* @function BackButton - The component for the button to navigate to the previous page.
* @return {JSX} - The JSX for the component.
*/
function BackButton() {
    return (
        <Fab variant="extended" size="small" style={{ backgroundColor: "white", top: "2%", left: "5%", position: "absolute" }}>
            <ArrowBackIcon style={{ opacity: 0.7 }} />
            Back
        </Fab>
    )
}

export default BackButton;
