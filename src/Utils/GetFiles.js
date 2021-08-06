// const fs = window.require('fs');
const electron = window.require('electron')
const fs = electron.remote.require('fs')
const path = electron.remote.require('path')

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/")

function getPath(name){
    //name = name.replace(/\s+/g, '');
    return name
}

export function getFiles(dir) {
    let contents = []
    fs.readdirSync(dir).forEach(file => {
        if (file.startsWith(".")) {
            return
        }

        let type = fs.lstatSync(dir + file).isDirectory() ? "Folder" : "List"
        if (type === "Folder") {
            let contains = getFiles(dir+file+"/")
            contents.push({ "NAME": file, "TYPE": type, "PATH": getPath(file), "CONTAINS": contains })
        } else {
            contents.push({"NAME": file.substring(0, file.length-5), "TYPE": type, "PATH": file})
        }
    })
    return contents
}

export function move(item, folder, name) {
    let split = item.id.split('-')
    split.pop()

    let folderSplit = folder.split('-')
    folderSplit.pop()

    let oldpath
    let newpath

    if (item.type === "List") {
        oldpath = path.join(dataFolder, split.join('/'), item.name+'.list')
        newpath = path.join(dataFolder, folderSplit.join('/'), name, item.name+'.list')
    } else {
        oldpath = path.join(dataFolder, split.join('/'), item.name)
        newpath = path.join(dataFolder, folderSplit.join('/'), name, item.name)
    }

    fs.rename(oldpath, newpath, (err) => {
        if (err) throw err
        console.log(`${oldpath} moved to ${newpath}`)
    })
}
