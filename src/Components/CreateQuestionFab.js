import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
/** 
* @function CreateQuestionFab - Button to add a new question to a list
* @param {Function} props.onClick - The function that is run when the button is clicked by the user
* @return {JSX} - JSX of the button
*/
function CreateQuestionFab(props) {
    return (
        <div style={{ paddingTop: "3%" }}>
            <Fab variant="extended" size="small" onClick={props.onClick} style={{ backgroundColor: "white", left: "5%", position: "absolute" }}>
                <AddIcon style={{ opacity: 0.7 }} />
                New Question
            </Fab>
        </div>
    )
}

export default CreateQuestionFab;