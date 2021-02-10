import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function CreateListFab() {
    return (
        <Fab variant="extended" style={{backgroundColor: "white"}}>
            <AddIcon style={{opacity: 0.7}} />
            Create List
        </Fab>
    );
}

export default CreateListFab;