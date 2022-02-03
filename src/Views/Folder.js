import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CreateListFab from '../Components/CreateListFab';
import SortMenu from '../Components/SortMenu';
import ListGrid from '../Components/ListGrid';
import BackButton from '../Components/BackButton';
import { Grid } from '@material-ui/core';

/** 
* @function getPath - function for traversing through the directory tree recursively and finding the parent object of an item
* @param {Array} path - the path to the object from the current folder
* @param {Array} lists - the list of items in the current folder
* @param {String} parent - the path to the parent object of the current folder
* @return {Array, String} - an array of the items in the current folder followed by the path to the parent object
*/
function getPath(path, lists, parent) {

  if (path.length === 0) {
    if (lists) {
      return { lists, parent }
    } else {
      let lst = []
      return { lst, parent }
    }
  }

  for (let i = 0; i < lists.length; i++) {
    let item = lists[i]
    if (!item["PATH"]) {
      continue
    }
    let pth = item["PATH"].split("-")
    if (pth[pth.length - 1] === path[0]) {

      path.shift()
      pth.pop()

      return getPath(path, item["CONTAINS"], pth.join("-"))
    }
  }
}

/** 
* @function Folder - page that allows the user to view and traverse nested folders
* @return {JSX} - the JSX for the component
*/
function Folder(props) {
  const [sortMethod, setSortMethod] = React.useState("TYPE")
  const { pathStr } = useParams()
  const path = pathStr.split("-")

  // get the path to the parent object
  let parentPath

  if (path.length === 1) {
    parentPath = "/"
  } else {
    let parentPth = [...path]
    parentPth.pop()
    parentPath = parentPth.join('-')
    parentPath = `/folder/${parentPath}`
  }

  let pth = getPath(path, props.gridItems, parentPath)

  let { lists, parent } = pth

  return (
    <div>
      <Link to={parentPath}>
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

      <ListGrid path={pathStr} parent={parentPath} items={lists} sortMethod={sortMethod} top={20} />

    </div>
  );
}

export default Folder;
