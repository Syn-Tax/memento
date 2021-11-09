const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")

/** 
* @function createFolder - Function to create a folder
* @param {String} name - the name of the folder
* @param {String} pathRaw - the raw path to the folder
*/
export function createFolder(name, pathRaw) {
  // transform the raw path into a system path using path module
  let pathFinal
  if (pathRaw[0] === "Home") {
    pathFinal = path.join(dataFolder, name)
  } else {
    pathFinal = path.join(dataFolder, pathRaw.join("/"), name)
  }
  fs.mkdirSync(pathFinal) // create the folder using fs module
}
/** 
* @function checkName - check if the name of a list or folder is valid
* @param {String} name - the name to be checked
* @param {Array} pathRaw - the raw path to the item
* @param {Array} lists - the array containing all items and their names/metadata
* @return {Boolean} - whether the name is valid
*/
function checkName(name, pathRaw, lists) {
  // if the raw path is "Home" or empty, check if the name already exists in the root folder
  if (pathRaw[0] === "Home" || pathRaw.length === 0) {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i]["NAME"] === name) {
        return true
      }
    }
    return false
  }

  // otherwise enter the next step in the path to that item, change the lists variable and call checkName recursively on the new folder
  for (let i = 0; i < lists.length; i++) {
    let item = lists[i]
    if (!item["PATH"]) {
      continue
    }
    let pth = item["PATH"].split("-")
    if (pth[pth.length - 1] === path[0]) {

      path.shift()
      pth.pop()

      return checkName(name, path, item["CONTAINS"])
    }
  }
}

/** 
* @function checkFolder - function that is run to check the name of a folder is valid
* @param {String} name - the name to be validated
* @param {Array} pathRaw - the path to the item
* @param {Array} gridItems - The array of objects containing all items
* @return {String} - The error message to display to the user, false if no error
*/
export function checkFolder(name, pathRaw, gridItems) {
  let symbolRegex = /^[a-zA-Z0-9 ]*$/ // Regular expression to check for any invalid characters
  if (!symbolRegex.exec(name)) {
    return "A Name can only consist of letters, numbers and spaces"
  } else if (checkName(name, pathRaw, gridItems)) { // check if the name already exists
    return "That name already exists"
  } else { // otherwise the name is valid
    return false
  }
}
