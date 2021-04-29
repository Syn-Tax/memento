const electron = window.require('electron')
const fs = electron.remote.require('fs')

export function createFolder(name, pathRaw) {
    let path
    if (pathRaw[0] == "Home") {
        path = `./Data/${name}`
    } else {
        let path = `./Data/${pathRaw.join("/")}/${name}`
    }
    console.log(path)
    fs.mkdirSync(path)
}

function checkName(name, path, lists) {
    if (path[0] === "Home") {
        for (let i=0; i<lists.length; i++) {
            if (lists[i]["NAME"] == name) {
                return true
            } 
        }
        return false
    }

    if (path.length === 0) {
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

export function checkFolder(name, path, gridItems) {
    let symbolRegex = /^[a-zA-Z0-9 ]*$/;
    if (!symbolRegex.exec(name)) {
        return "A Name can only consist of letters, numbers and spaces"
    } else if (checkName(name, path, gridItems)) {
        return "That name already exists"
    } else {
        return false
    }
}