import { Grid } from '@material-ui/core';
import ListItem from './ListItem';
import { move } from '../Utils/GetFiles'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
/** 
* @function ListGrid - Component to display all items (lists and folders) as a grid
* @param {String} props.sortMethod - The key by which items should be sorted when they are displayed
* @param {Array} props.items - The items that should be displayed
* @return {JSX} - The JSX of the component
*/
function ListGrid(props) {
  // variables for how the items are arranged
  const verticalSpacing = 5
  const height = 16
  const itemsPerRow = 4

  // sort the items
  props.items.sort((a, b) => ((a[props.sortMethod] < b[props.sortMethod]) ? -1 : (a[props.sortMethod] > b[props.sortMethod]) ? 1 : 0))

  // split the items into rows of lengnth "itemsPerRow"
  let items = []

  for (let i = 0; i < props.items.length; i += itemsPerRow) {
    items.push(props.items.slice(i, i + itemsPerRow))
  }

  items.push([]) // create some blank space at the bottom of the page

  const handleMove = (item, monitor, pth, name, path) => { // function to handle drag/drop to move items
    move(item, (path ? path + "-" : "") + pth, name) // run the util file to move files/folders
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}> {/* Allow for drag and drop using react-dnd */}
        {/* display the "ListItem" component for each item, first looping through rows and then looping through each item in that row */}
        {items.map((row, i) => (
          <Grid container spacing={3} style={{ top: `${props.top + (i * (height + verticalSpacing))}%`, position: "absolute", height: `${height}%` }}>
            <Grid item xs={2}></Grid>

            {row.map((item, j) => (
              <Grid item xs={2}><ListItem pth={props.path} parent_path={props.parent} handleMove={handleMove} gridItems={props.items} type={item["TYPE"]} name={item["NAME"]} path={item["PATH"]} /></Grid>
            ))}
          </Grid>
        ))}
      </DndProvider>
    </div>
  );
}

export default ListGrid;
