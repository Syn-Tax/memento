import React from 'react';
import Home from './Views/Home';
import Folder from './Views/Folder';
import CreateList from './Views/CreateList';
import List from './Views/List';
import Test from './Views/Test';
import End from './Views/End'
import './Css/App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { getFiles } from './Utils/GetFiles';
const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

const appPath = electron.remote.app.getPath('userData');

const dataFolder = path.join(appPath, "./Data/")

// create the data directory if it doesn't exist
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// create the images directory if it doesn't exist
if (!fs.existsSync(path.join(dataFolder, "./.images"))) {
    fs.mkdirSync(path.join(dataFolder, "./.images"))
}

// get the files in the data directory 
let files = getFiles(dataFolder)

/** 
* @function App - the base component
* @return {JSX} - The JSX for the current page
*/
function App() {
    // state for storing the files in object form
    const [gridItems, setGridItems] = React.useState(files)

    // if a file has been changed, get the files again
    fs.watch(dataFolder, { recursive: true }, (event, file) => {
        files = getFiles(dataFolder)
        setGridItems(files)
    })

    // return the current page using react-router
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home gridItems={gridItems} />
                    </Route>
                    <Route path="/folder/:pathStr">
                        <Folder gridItems={gridItems} />
                    </Route>
                    <Route path="/list/:pathStr">
                        <List />
                    </Route>
                    <Route path="/test/:pathStr">
                        <Test />
                    </Route>
                    <Route path="/create-list/:pathStr">
                        <CreateList gridItems={gridItems} />
                    </Route>
                    <Route path="/end/:pathStr">
                        <End />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
