const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data")

export function createFolder(name, pathRaw) {
    let pathFinal
    if (pathRaw[0] == "Home") {
        pathFinal = path.join(dataFolder, name)
    } else {
        pathFinal = path.join(dataFolder, pathRaw.join("/"), name)
    }
    console.log(pathFinal)
    fs.mkdirSync(pathFinal)
}

function checkName(name, pathRaw, lists) {
    if (pathRaw[0] === "Home") {
        for (let i=0; i<lists.length; i++) {
            if (lists[i]["NAME"] == name) {
                return true
            } 
        }
        return false
    }

    if (pathRaw.length === 0) {
        for (let i=0; i<lists.length; i++) {
            if (lists[i]["NAME"] === name) {
                return true
            } 
        }
        return false
    }

    for (let i=0; i<lists.length; i++) {
        let item = lists[i]
        if (!item["PATH"]) {
            continue
        }
        let pth = item["PATH"].split("-")
        if (pth[pth.length-1] == path[0]) {

            path.shift()
            pth.pop()

            return checkName(name, path, item["CONTAINS"])
        } 
    }
}

export function checkFolder(name, pathRaw, gridItems) {
    let symbolRegex = /^[a-zA-Z0-9 ]*$/;
    if (!symbolRegex.exec(name)) {
        return "A Name can only consist of letters, numbers and spaces"
    } else if (checkName(name, pathRaw, gridItems)) {
        return "That name already exists"
    } else {
        return false
    }
}