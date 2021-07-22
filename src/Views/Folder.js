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
    // console.log("PATH")
    // console.log(path)
    count ++
    console.log(count)
    console.log(lists)
    console.log(path)

    if (path.length === 0) {
        console.log("LISTS")
        console.log(lists)
        return {lists, parent}
    }

    for (let i=0; i<lists.length; i++) {
        let item = lists[i]
        if (!item["PATH"]) {
            continue
        }
        let pth = item["PATH"].split("-")
        // console.log(pth[pth.length-1] == path[0])
        // console.log(pth)
        // console.log(i)

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
    console.log("URL")
    console.log(window.location.href)
    console.log("PATH STRING")
    console.log(pathStr)

    let pth = getPath(path, props.gridItems, "/")
    console.log(pth)

    let {lists, parent} = pth

    let parentPath

    if (parent === "/" || parent === "") {
        parentPath = "/"
    } else {
        parentPath = `/folder/${parent}`
    }

    console.log("PARENT")
    console.log(parent)

    console.log("PARENT PATH")
    console.log(parentPath)

    console.log("GRID ITEMS")
    console.log(lists)

    return (
        <div>
            <div style={{ position: "static" }}>
                <NavbarToggle lists={props.gridItems} />
            </div>

            <Link to={parentPath}>
                <BackButton />
            </Link>

            <Grid container style={{ top: "10%", position: "absolute" }}>
                <Grid item xs={3}>
                    <CreateListFab path={pathStr} />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3} style={{ display: 'flex', flexDirection: 'row' }} >
                    <SortMenu changeState={(method) => setSortMethod(method)} />
                </Grid>
            </Grid>

            <ListGrid items={lists} sortMethod={sortMethod} top={18} />

        </div>
    );
}

export default Folder;
