import React from 'react';
import Home from './Views/Home';
import Folder from './Views/Folder';
import CreateFolder from './Views/CreateFolder';
import CreateList from './Views/CreateList';
import List from './Views/List';
import Test from './Views/Test';
import './Css/App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { getFiles } from './Utils/GetFiles';
const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

const appPath = electron.remote.app.getPath('userData');

const dataFolder = path.join(appPath, "./Data/")

console.log(appPath)
if (!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
}

if (!fs.existsSync(path.join(dataFolder, "./.images"))) {
    fs.mkdirSync(path.join(dataFolder, "./.images"))
}

let files = getFiles(dataFolder)

function App() {
    const [gridItems, setGridItems] = React.useState(files)

    fs.watch(dataFolder, {recursive: true}, (event, file) => {
        files = getFiles(dataFolder)
        setGridItems(files)
    })


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
