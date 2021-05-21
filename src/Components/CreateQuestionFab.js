import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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