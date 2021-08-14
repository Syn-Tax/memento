import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarToggle from '../Components/NavbarToggle'
import CreateListFab from '../Components/CreateListFab';
import SortMenu from '../Components/SortMenu';
import ListGrid from '../Components/ListGrid';
import BackButton from '../Components/BackButton';

import { Grid } from '@material-ui/core';

let count = 0

function getPath(path, lists, parent) {

    if (path.length === 0) {
        if (lists) {
            return {lists, parent}
        } else {
            let lst = []
            return {lst, parent}
        }
    }

    for (let i=0; i<lists.length; i++) {
        let item = lists[i]
        if (!item["PATH"]) {
            continue
        }
        let pth = item["PATH"].split("-")
        if (pth[pth.length-1] === path[0]) {

            path.shift()
            pth.pop()

            return getPath(path, item["CONTAINS"], pth.join("-"))
        } 
    }
}

function Folder(props) {
    const [sortMethod, setSortMethod] = React.useState("TYPE")
    const { pathStr } = useParams()
    const path = pathStr.split("-")

    let parentPath

    if (path.length === 1) {
        parentPath = "/"
    } else {
        let parentPth = [...path]
        parentPth.pop()
        parentPath = parentPth.join('-')
    }

    let pth = getPath(path, props.gridItems, parentPath)

    let {lists, parent} = pth

    return (
        <div>
          { /*
            <div style={{ position: "static" }}>
                <NavbarToggle lists={props.gridItems} />
            </div> */ }

            <Link to={`/folder/${parentPath}`}>
                <BackButton />
            </Link>

            <Grid container style={{ top: "10%", position: "absolute" }}>
                <Grid item xs={3}>
                  <CreateListFab path={pathStr} gridItems={props.gridItems} />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3} style={{ display: 'flex', flexDirection: 'row' }} >
                    <SortMenu changeState={(method) => setSortMethod(method)} />
                </Grid>
            </Grid>

            <ListGrid path={pathStr} parent={parentPath} items={lists} sortMethod={sortMethod} top={18} />

        </div>
    );
}

export default Folder;
