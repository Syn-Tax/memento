import React from 'react'
import { Fab, Grid } from '@material-ui/core'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { copyImg } from '../Utils/Images'

const electron = window.require('electron')
const path = electron.remote.require('path')
const fs = electron.remote.require('fs')

const appPath = electron.remote.app.getPath('userData')

const dataFolder = path.join(appPath, "./Data/")
const imagesFolder = path.join(dataFolder, "./.images")

function SetQuestionImage(props) {
  const [containsImage, setContainsImage] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(null)

  const browseImage = (e) => {
    let value = window.electron.dialog.showOpenDialogSync({properties: ['openFile'], filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg", "gif"] }]})[0]

    if (!value) {
      return
    }

    if (containsImage) {
      fs.unlinkSync(path.join(imagesFolder, currentId))
    }

    let id = copyImg(value)
    let name = path.basename(value)

    props.setImage(id, name)
    setContainsImage(true)
    setCurrentId(id)
  }

  return (
    <Grid container>
      <Grid item xs={6}>
        Image: {containsImage ? "yes" : "no"}
      </Grid>
      <Grid item xs={6}>
        <Fab variant="extended" onClick={browseImage} style={{ backgroundColor: "white", width: 150, position: "absolute", top: "8vh", left: "50%" }} >
          <FolderOpenIcon style={{ opacity: 0.7, position: "absolute", left: 25 }} />
          <p style={{ position: "absolute", right: 30, top: 0 }} >Browse</p>
        </Fab>
    </Grid>
    </Grid>
  )
}

export default SetQuestionImage
