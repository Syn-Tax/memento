const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')
const Jimp = electron.remote.require('jimp')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")
const hexLength = 8 // the length of the random hex string that is assigned to the image

/** 
* @function hexString - function to generate a random hexadecimal string with a given length
* @param {Integer} length - The length of the string
* @return {String} - a random hex string
*/
function hexString(length) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

/** 
* @function copyImg - function to copy the selected image to the images folder and rename it using a random hex string and reformat it to a .png image
* @param {String} pth - the path to the selected image
* @return {String} - the new name of the image
*/
export function copyImg(pth) {
  let hexstr = hexString(hexLength) // generate a random hexadecimal string

  // check if the string already exists (this is extremely unlikely with 8 hex digits and so remains efficient)
  let existing = []

  fs.readdirSync(path.join(dataFolder, "./.images")).forEach(file => {
    existing.push(file.replace(/\.[^/.]+$/, ""))
  })

  while (existing.includes(hexstr)) { // if it already exists, choose a different one
    hexstr = hexString(hexLength)
  }

  let name = hexstr + ".png"

  Jimp.read(pth, (err, image) => { // read, write and rename the image to give its new name
    if (err) throw err

    image.write(path.join(dataFolder, "./.images", name))
  })

  return name
}
