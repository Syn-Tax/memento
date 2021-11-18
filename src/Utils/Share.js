import { loadList } from './List'

const electron = window.require('electron')
const path = electron.remote.require('path')
const zipdir = electron.remote.require('zip-dir')
const DecompressZip = electron.remote.require('decompress-zip')

const tempFolder = path.join(electron.remote.app.getPath('temp'), "./memento")
const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")

const fse = electron.remote.require('fs-extra')

/** 
* @function copyImport - Copy extracted folders and images into the data directory
* @param {String} pth - Filesystem path of the imported file/folder
*/
function copyImport(pth) {
  fse.copy(tempFolder,
    pth,
    (err) => {
      if (err) throw err
    }
  ) // copy the folder/file itself

  // For every file in the temp/.images directory copy it to the Data/.images directory
  fse.readdirSync(path.join(tempFolder, "./.images")).forEach(file => {
    fse.copy(path.join(tempFolder, "./.images") + file,
      path.join(dataFolder, "./.images") + file,
      (err) => {
        if (err) throw err
      })
  }) // copy the images associated with it
}

/** 
* @function importItem - function that handles importing an item
* @param {String} zipPath - the path to the zip file to be imported
* @param {String} folderPathStr - the path to which the folder should be imported
*/
export function importItem(zipPath, folderPathStr) {
  if (!fse.existsSync(tempFolder)) { // create the temp folder if it doesn't exist
    fse.mkdirSync(tempFolder, { recursive: true })
  }

  // convert the String path to a filepath
  let pthS = folderPathStr.split('-')
  let pth = dataFolder

  if (pthS.length > 1) {
    for (let i = 0; i < pthS.length; i++) {
      pth = path.join(pth, pthS[i])
    }
  }
  // decompress the zip file to the temp folder using decompress-zip
  let unzipper = new DecompressZip(zipPath)

  unzipper.on('error', (err) => {
    if (err) throw err
  })

  unzipper.on('extract', (log) => {
    copyImport(pth)
  })

  unzipper.extract({
    path: tempFolder
  })
}

/** 
* @function getImgs - function to get all images corresponding to all lists within a folder
* @param {String} filePath - the filepath to the list or folder
* @param {Array} imgs - the array of images to be added to
*/
function getImgs(filePath, imgs) {
  fse.readdirSync(filePath).forEach(file => { // loop through each item in the directory
    if (fse.lsstatSync(dir + file).isDirectory()) { // if this item is a directory then call recursively
      getImgs(dir + file, imgs)
    }

    // otherwise read the list and add all images to the array
    let questions = loadList(dir + file)

    questions.forEach((question) => {
      if (question["IMAGE_ID"]) {
        imgs.push(question["IMAGE_ID"])
      }
    })
  })
}

/** 
* @function share - function to zip and save a list or folder to be shared with other users
* @param {String} filePath - the path to the item that is to be shared
* @param {String} file - the path to which the zip file should be saved
* @param {string} type - the type of the item to be saved
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/
export function share(filePath, file, type) {
  const imgPath = path.join(tempFolder, "./.images")

  if (!fse.existsSync(imgPath)) { // create the images folder in the temp directory
    fse.mkdirSync(imgPath, { recursive: true })
  }

  if (type === "List") { // if the type of the item is a list
    // copy all the images associated with that list to the images folder
    let questions = loadList(filePath)

    questions.forEach((question) => {
      if (question["IMAGE_ID"]) {
        fs - extra.copyFile(path.join(dataFolder, "./.images", question["IMAGE_ID"]),
          path.join(imgPath, question["IMAGE_ID"]),
          (err) => {
            if (err) throw err
          })
      }
    })

    // get the filepath from the path string
    let pthS = filePath.split("-")

    let pth = dataFolder

    for (let i = 0; i < pthS.length; i++) {
      pth = path.join(pth, pthS[i])
    }

    // copy the list to the temp folder
    fs - extra.copyFile(pth, path.join(tempFolder, pthS.pop()), (err) => {
      if (err) throw err
    })
  } else { // if the item is a folder
    let imgs = []
    getImgs(filePath, imgs) // get all the images associated with lists within that folder

    imgs.forEach((img) => { // copy each of them to the temporary images folder
      fse.copyFile(path.join(dataFolder, "./.images", img),
        path.join(imgPath, img),
        (err) => {
          if (err) throw err
        })
    })

    // convert path string to a filepath
    let pthS = filePath.split("-")

    let pth = dataFolder

    for (let i = 0; i < pthS.length; i++) {
      pth = path.join(pth, pthS[i])
    }

    // copy the folder to the temp directory
    fse.copy(pth, path.join(tempFolder, pthS.pop()), (err) => {
      if (err) throw err
    })
  }

  // zip the temporary folder using zipdir and save to the specified path
  zipdir(tempFolder, { saveTo: file }, (err, buffer) => {
    if (err) throw err
  })

  // delete the temporary folder so it can be used again
  fse.rmdir(tempFolder, { recursive: true })
}
