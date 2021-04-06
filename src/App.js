import './Css/App.css';
import NavbarToggle from './Components/NavbarToggle'
import Welcome from './Components/Welcome';
import CreateListFab from './Components/CreateListFab';
import SortMenu from './Components/SortMenu';
import ViewMenu from './Components/ViewMenu';
import ListGrid from './Components/ListGrid';

import { Grid } from '@material-ui/core';

const gridItems = [{"type": "Folder", "name": "Folder 1", "path": null},
                   {"type": "Folder", "name": "Folder 2", "path": null},
                   {"type": "List", "name": "List 1"},
                   {"type": "List", "name": "List 2"},
                   {"type": "List", "name": "List 3"},
                   {"type": "Folder", "name": "Folder 1", "path": null},
                   {"type": "Folder", "name": "Folder 2", "path": null},
                   {"type": "List", "name": "List 1"},
                   {"type": "List", "name": "List 2"},
                   {"type": "List", "name": "List 3"},
                   {"type": "Folder", "name": "Folder 1", "path": null},
                   {"type": "Folder", "name": "Folder 2", "path": null},
                   {"type": "List", "name": "List 1"},
                   {"type": "List", "name": "List 2"},
                   {"type": "List", "name": "List 3"}]

function App() {
  return (
    <div className="App">
      <div style={{ position: "static" }}>
        <Welcome />
        <NavbarToggle />
      </div>

      <Grid container style={{ top: "27%", position: "absolute" }}>
        <Grid item xs={3}>
          <CreateListFab />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3} style={{display: 'flex', flexDirection: 'row'}} >
          <SortMenu />
        </Grid>
      </Grid>

      <ListGrid items={gridItems}/>

    </div>
  );
}

export default App;
