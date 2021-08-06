import { Grid } from '@material-ui/core';
import ListItem from './ListItem';
import { move } from '../Utils/GetFiles'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function ListGrid(props) {
    const verticalSpacing = 5
    const height = 16

    props.items.sort((a, b) => ((a[props.sortMethod] < b[props.sortMethod]) ? -1 : (a[props.sortMethod] > b[props.sortMethod]) ? 1 : 0))

    let items = []

    for (let i=0; i<props.items.length; i += 3) {
        items.push(props.items.slice(i, i+3))
    }

    // console.log(props.sortMethod)

    items.push([])
    // console.log(items)

    const handleMove = (item, monitor, pth, name) => {
        move(item, pth, name)
    }

    return (
        <div>
          <DndProvider backend={HTML5Backend}>
            {items.map((item, i) => (
                <Grid container spacing={3} style={{ top: `${props.top + (i * (height + verticalSpacing))}%`, position: "absolute", height: `${height}%` }}>
                  <Grid item xs={2}></Grid>
                  {item.map((list, j) => (
                      <Grid item xs={3}><ListItem pth={props.path} parent_path={props.parent} handleMove={handleMove} gridItems={props.items} type={list["TYPE"]} name={list["NAME"]} path={list["PATH"]} /></Grid>
                  ))}
                </Grid>
            ))}
          </DndProvider>
        </div>
    );
}

export default ListGrid;
