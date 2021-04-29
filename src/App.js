import React from 'react';
import Home from './Views/Home';
import Folder from './Views/Folder';
import CreateFolder from './Views/CreateFolder';
import CreateList from './Views/CreateList';
import './Css/App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { getFiles } from './Utils/GetFiles';
const electron = window.require('electron')
const fs = electron.remote.require('fs')

// this must be from the point of view of the root folder
const dataFolder = "./Data/"
let files = getFiles(dataFolder)

function App() {
    const [gridItems, setGridItems] = React.useState(files)

    fs.watch(dataFolder, {recursive: true}, (event, file) => {
        files = getFiles(dataFolder)
        setGridItems(files)
    })

    console.log(window.location.href)

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
                    <Route path="/create-folder/:pathStr">
                        <CreateFolder gridItems={gridItems} />
                    </Route>
                    <Route path="/create-list/:pathStr">
                        <CreateList gridItems={gridItems} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;