import React from 'react';
import CreateListFab from '../Components/CreateListFab';
import SortMenu from '../Components/SortMenu';
import ListGrid from '../Components/ListGrid';
import { Grid } from '@material-ui/core';

/** 
* @function Home - The homepage
* @return {JSX} - The JSX for the component
*/
function Home(props) {
  const [sortMethod, setSortMethod] = React.useState("TYPE")

  return (
    <div>
      {/* the component that shows the root filetree  */}
      <Grid container style={{ top: "10%", position: "absolute", height: "73%" }}>
        <Grid item xs={1}>
          <CreateListFab path="Home" gridItems={props.gridItems} />
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={1} style={{ display: 'flex', flexDirection: 'row' }} >
          <SortMenu changeState={(method) => setSortMethod(method)} />
        </Grid>
      </Grid>

      <ListGrid items={props.gridItems} sortMethod={sortMethod} top={20} />

    </div>
  );
}

export default Home;
