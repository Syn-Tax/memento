const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')
const Jimp = electron.remote.require('jimp')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")
const hexLength = 8

/*
const fs = require("fs")
const path = require("path")
const Jimp = require("jimp")

const dataFolder = "/home/oscar/.config/Electron/Data/"
*/

function hexString(length) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

export function copyImg(pth) {
  let hexstr = hexString(hexLength)

  let existing = []

  fs.readdirSync(path.join(dataFolder, "./.images")).forEach(file => {
    existing.push(file.replace(/\.[^/.]+$/, ""))
  })

  while (existing.includes(hexstr)) {
    hexstr = hexString(hexLength)
  }

  let name = hexstr+".png"

  Jimp.read(pth, (err, image) => {
    if (err) throw err

    image.write(path.join(dataFolder, "./.images", name))
  })

  return name
}
