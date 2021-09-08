import React from 'react';
import NavbarToggle from '../Components/NavbarToggle'
import Welcome from '../Components/Welcome';
import CreateListFab from '../Components/CreateListFab';
import SortMenu from '../Components/SortMenu';
import ListGrid from '../Components/ListGrid';

import { Grid } from '@material-ui/core';

function Home(props) {
  const [sortMethod, setSortMethod] = React.useState("TYPE")

  console.log(window.location.href)

  return (
    <div>
      <div style={{ position: "static" }}>
        <Welcome />
        {/*<NavbarToggle lists={props.gridItems} />*/}
      </div>

      <Grid container style={{ top: "27%", position: "absolute", height: "73%" }}>
        <Grid item xs={3}>
          <CreateListFab path="Home" gridItems={props.gridItems} />
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
