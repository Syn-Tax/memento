const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')
const Jimp = electron.remote.require('jimp')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")

/*
const fs = require("fs")
const path = require("path")
const Jimp = require("jimp")

const dataFolder = "/home/oscar/.config/Electron/Data/"
*/

function hexString(length) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

function copyImg(pth) {
  let hexstr = hexString(8)

  let existing = []

  fs.readdirSync(path.join(dataFolder, "./.images")).forEach(file => {
    existing.push(file.replace(/\.[^/.]+$/, ""))
  })

  while (existing.includes(hexstr)) {
    hexstr = hexString(8)
  }

  let name = hexstr+".png"

  Jimp.read(pth, (err, image) => {
    if (err) throw err

    image.write(path.join(dataFolder, "./.images", name))
  })

  return name
}
