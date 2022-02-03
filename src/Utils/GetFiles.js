const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/")

/** 
* @function getFiles - function to get all the files in the data folder and format them into an array of objects with metadata
* The file object contains the following structure
* {"NAME" (String): The name of the file, "TYPE" (String): "List" or "Folder", "PATH" (String): name of file, "CONTAINS" (Array): The items contained in a folder}
* @param {String} dir - the directory to read files from
* @return {Array} - an array of file objects that mimic the directory structure in the filesystem
*/
export function getFiles(dir) {
  let contents = []

  fs.readdirSync(dir).forEach(file => { // loop through each file in the chosen directory
    if (file.startsWith(".")) { // ignore dotfiles (hidden files), this will ignore the images folder
      return
    }

    let type = fs.lstatSync(dir + file).isDirectory() ? "Folder" : "List" // get the type of the current item

    if (type === "Folder") {
      let contains = getFiles(dir + file + "/") // get the contents of a folder by calling recursively
      // create the file object and push it to the array
      contents.push({ "NAME": file, "TYPE": type, "PATH": file, "CONTAINS": contains })
    } else {
      // create the file object and push it to the array
      contents.push({ "NAME": file.substring(0, file.length - 5), "TYPE": type, "PATH": file })
    }
  })
  return contents // return the array of file objects
}

/** 
* @function move - function that handles moving files or folders to different paths in the filesystem
* @param {Object} item - The item to be moved
* @param {Object} folder - The folder the item should be moved to
*/
export function move(item, folder, name) {
  // compute the old path of the item and the new path once it is moved
  let split = item.id.split('-')
  split.pop()

  let folderSplit = folder.split('-')
  folderSplit.pop()

  let oldpath
  let newpath

  if (item.type === "List") {
    oldpath = path.join(dataFolder, split.join('/'), item.name + '.list')
    newpath = path.join(dataFolder, folderSplit.join('/'), name, item.name + '.list')
  } else {
    oldpath = path.join(dataFolder, split.join('/'), item.name)
    newpath = path.join(dataFolder, folderSplit.join('/'), name, item.name)
  }

  fs.rename(oldpath, newpath, (err) => { // move the item using the old path and the new path
    if (err) throw err
    console.log(`${oldpath} moved to ${newpath}`)
  })
}
