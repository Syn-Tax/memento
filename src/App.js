import './Css/App.css';
import { Paper, Grid, Box, Button, makeStyles, IconButton } from '@material-ui/core';
import NavbarToggle from './Components/NavbarToggle'
import MenuIcon from '@material-ui/icons/Menu';
import Welcome from './Components/Welcome';
// const electron = window.require('electron');
// const remote = electron.remote
// const {dialog} = remote

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16%"
  },
  paper: {
    paddingTop: 16,
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className="App">
      <Welcome />
      <NavbarToggle />
    </div>
  );
}

export default App;
