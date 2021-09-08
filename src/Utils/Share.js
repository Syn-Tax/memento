import { loadList } from './List'

const electron = window.require('electron')
const path = electron.remote.require('path')
const fs = electron.remote.require('fs-extra')
const zipdir = electron.remote.require('zip-dir')
const DecompressZip = electron.remote.require('decompress-zip')

const tempFolder = path.join(electron.remote.app.getPath('temp'), "./memento")
const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")

function copyImport(pth) {
  fs.copy(tempFolder,
          pth,
          (err) => {
            if (err) throw err
          })

  fs.readdirSync(path.join(tempFolder, "./.images")).forEach(file => {
    fs.copy(path.join(tempFolder, "./.images")+file,
            path.join(dataFolder, "./.images")+file,
           (err) => {
             if (err) throw err
           })
  })
}

export function importItem(zipPath, folderPathStr) {
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder, {recursive: true})
  }

  let pthS = folderPathStr.split('-')
  let pth = dataFolder

  if (pthS.length > 1){
    for (let i = 0; i < pthS.length; i++) {
      pth = path.join(pth, pthS[i])
    }
  }

  console.log(pth)

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

function getImgs(filePath, imgs) {
  fs.readdirSync(filePath).forEach(file => {
    if (fs.lsstatSync(dir+file).isDirectory()) {
      getImgs(dir+file, imgs)
    }

    let questions = loadList(dir+file)

    questions.forEach((question) => {
      if (question["IMAGE_ID"]) {
        imgs.push(question["IMAGE_ID"])
      }
    })
  })
}

export function share(filePath, file, type) {
  const imgPath = path.join(tempFolder, "./.images")

  if (!fs.existsSync(imgPath)) {
    fs.mkdirSync(imgPath, {recursive: true})
  }

  if (type === "List") {
    let questions = loadList(filePath)


    questions.forEach((question) => {
      if (question["IMAGE_ID"]) {
        fs.copyFile(path.join(dataFolder, "./.images", question["IMAGE_ID"]),
                        path.join(imgPath, question["IMAGE_ID"]),
                        (err) => {
                          if (err) throw err
                        })
      }
    })

    let pthS = filePath.split("-")

    let pth = dataFolder

    for (let i = 0; i < pthS.length; i++) {
      pth = path.join(pth, pthS[i])
    }

    fs.copyFile(pth, path.join(tempFolder, pthS.pop()), (err) => {
      if (err) throw err
    })
  } else {
    let imgs = []
    getImgs(filePath, imgs)

    imgs.forEach((img) => {
      fs.copyFile(path.join(dataFolder, "./.images", img),
                      path.join(imgPath, img),
                      (err) => {
                        if (err) throw err
                      })
    })

    let pthS = filePath.split("-")

    let pth = dataFolder

    for (let i = 0; i < pthS.length; i++) {
      pth = path.join(pth, pthS[i])
    }

    fs.copy(pth, path.join(tempFolder, pthS.pop()), (err) => {
      if (err) throw err
    })
  }

  zipdir(tempFolder, { saveTo: file }, (err, buffer) => {
    if (err) throw err
  })

  fs.rmdir(tempFolder, { recursive: true })
}
