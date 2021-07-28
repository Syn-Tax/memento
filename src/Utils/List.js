const electron = window.require("electron")
const fs = electron.remote.require("fs")
const path = electron.remote.require("path")

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/")

function dumpStr(questions) {
    let output = ""

    for (let i=0; i<questions.length; i++) {
        let answers = questions[i]["ANSWERS"]
        let line = questions[i]["TYPE"]+"\t"+questions[i]["TITLE"]+"\t"+answers.join(";")+"\t"+questions[i]["CORRECT"]+"\n"
        console.log("answers", answers)
        output += line
    }

    return output
}

function loadStr(string) {
    let questions = []

    const lines = string.split("\n")

    for (let i=0; i<lines.length; i++) {
        const params = lines[i].split("\t")
        if (params[0] === "text") {
            questions.push({"TITLE": params[1], "TYPE": "text", "ANSWERS": params[2].split(";")})
        }
    }

    return questions
}

export function saveList(questions, name, pathStr) {
    const pathS = pathStr.split('-')
    let file = dataFolder

    if (pathS[0] === "Home") {
        file = path.join(file, name+".list")
    } else {
        for (let i = 0; i < pathS.length; i++) {
            file = path.join(file, pathS[i])
        }
        file = path.join(file, name + ".list")
    }

    const contents = dumpStr(questions)
    console.log("contents", contents)

    fs.writeFile(file, contents, (err) => {
        if (err) throw err
        console.log("written file")
    })
}

export function loadList(pathStr) {
    const pathS = pathStr.split('-')
    let file = dataFolder

    for (let i = 0; i < pathS.length; i++) {
        file = path.join(file, pathS[i])
    }

    const questions = loadStr(fs.readFileSync(file, 'utf-8', (err) => {
        if (err) throw err
        console.log(`read ${file}`)
    }))
    return questions
}
