import React from 'react';
import NavbarToggle from '../Components/NavbarToggle'
import Welcome from '../Components/Welcome';
import CreateListFab from '../Components/CreateListFab';
import SortMenu from '../Components/SortMenu';
import ViewMenu from '../Components/ViewMenu';
import ListGrid from '../Components/ListGrid';

import { Grid } from '@material-ui/core';

function Home(props) {
  const [sortMethod, setSortMethod] = React.useState("TYPE")

  return (
    <div>
      <div style={{ position: "static" }}>
        <Welcome />
        <NavbarToggle lists={props.gridItems} />
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

      <ListGrid items={props.gridItems} sortMethod={sortMethod} top={35} />

    </div>
  );
}

export default Home;
