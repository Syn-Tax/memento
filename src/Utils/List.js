const electron = window.require("electron")
const fs = electron.remote.require("fs")
const path = electron.remote.require("path")

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/")

function dumpStr(questions) {
    let output = ""

    for (let i=0; i<questions.length; i++) {
        let answers = questions[i]["ANSWERS"]
        let line

        if (questions[i]["TYPE"] === "text") {
            line = `${questions[i]["TYPE"]}\t${questions[i]["TITLE"]}\t${answers.join(";")}\t${questions[i]["IMAGE_ID"] ? questions[i]["IMAGE_ID"] : "undefined"}\t${questions[i]["IMAGE_NAME"] ? questions[i]["IMAGE_NAME"] : "undefined"}\t${questions[i]["INCORRECT"] ? questions[i]["INCORRECT"] : "0"}\n`
        } else if (questions[i]["TYPE"] === "multi") {
            line = `${questions[i]["TYPE"]}\t${questions[i]["TITLE"]}\t${answers.join(";")}\t${questions[i]["CORRECT"]}\t${questions[i]["IMAGE_ID"] ? questions[i]["IMAGE_ID"] : "undefined"}\t${questions[i]["IMAGE_NAME"] ? questions[i]["IMAGE_NAME"] : "undefined"}\t${questions[i]["INCORRECT"] ? questions[i]["INCORRECT"] : "0"}\n`
        }

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
            questions.push({"TITLE": params[1],
                            "TYPE": params[0],
                            "ANSWERS": params[2].split(";"),
                            "IMAGE_ID": params[3]==="undefined" ? null : params[3],
                            "IMAGE_NAME": params[4]==="undefined" ? null : params[4],
                            "INCORRECT": parseInt(params[5])
                           })
        } else if (params[0] === "multi") {
            questions.push({"TITLE": params[1],
                            "TYPE": params[0],
                            "ANSWERS": params[2].split(";"),
                            "CORRECT": parseInt(params[3]),
                            "IMAGE_ID": params[4]==="undefined" ? null : params[4],
                            "IMAGE_NAME": params[5]==="undefined" ? null : params[5],
                            "INCORRECT": parseInt(params[6])
                           })
        }
    }

    return questions
}

export async function saveList(questions, name, pathStr) {
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
