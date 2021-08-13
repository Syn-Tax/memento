import { loadList } from './List'

const JSZip = require('jszip')
const electron = window.require('electron')
const path = electron.remote.require('path')

export function share(path, file, type) {
  const zip = JSZip()

  if (type === "List") {
    let questions = loadList(path)

    questions.forEach((question) => {
      if (question["IMAGE_ID"]) {
        zip.file()
      }
    })
  }
}
