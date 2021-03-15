import './Css/App.css';
import NavbarToggle from './Components/NavbarToggle'
import Welcome from './Components/Welcome';
import CreateListFab from './Components/CreateListFab';
import SortMenu from './Components/SortMenu';
import ViewMenu from './Components/ViewMenu';
import ListGrid from './Components/ListGrid';

import { Grid } from '@material-ui/core';

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

      <ListGrid />
    </div>
  );
}

export default App;
