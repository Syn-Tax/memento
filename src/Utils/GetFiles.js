// const fs = window.require('fs');
const electron = window.require('electron')
const fs = electron.remote.require('fs')

function getPath(name){
    name = name.replace(/\s+/g, '');
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

// console.log(JSON.stringify(getFiles(dataFolder), null, 4))
