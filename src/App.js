import React from 'react';
import './Css/App.css';
import NavbarToggle from './Components/NavbarToggle'
import Welcome from './Components/Welcome';
import CreateListFab from './Components/CreateListFab';
import SortMenu from './Components/SortMenu';
import ViewMenu from './Components/ViewMenu';
import ListGrid from './Components/ListGrid';

import { Grid } from '@material-ui/core';

const gridItems = [{"TYPE": "Folder", "NAME": "Folder 1", "path": null},
                   {"TYPE": "Folder", "NAME": "Folder 2", "path": null},
                   {"TYPE": "List", "NAME": "List 1"},
                   {"TYPE": "List", "NAME": "List 2"},
                   {"TYPE": "List", "NAME": "List 3"},
                   {"TYPE": "List", "NAME": "List 4"},
                   {"TYPE": "List", "NAME": "List 5"},
                   {"TYPE": "List", "NAME": "List 6"},
                   {"TYPE": "Folder", "NAME": "Folder 5", "path": null},
                   {"TYPE": "Folder", "NAME": "Folder 6", "path": null},
                   {"TYPE": "Folder", "NAME": "Folder 3", "path": null},
                   {"TYPE": "Folder", "NAME": "Folder 4", "path": null},
                   {"TYPE": "List", "NAME": "List 7"},
                   {"TYPE": "List", "NAME": "List 8"},
                   {"TYPE": "List", "NAME": "List 9"}]

function App() {
  const [sortMethod, setSortMethod] = React.useState("TYPE")

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
          <SortMenu changeState={(method) => setSortMethod(method)} />
        </Grid>
      </Grid>

      <ListGrid items={gridItems} sortMethod={sortMethod} />

    </div>
  );
}

export default App;
