const electron = window.require("electron")
const fs = electron.remote.require("fs")
const path = electron.remote.require("path")

const dataFolder = path.join(electron.remote.app.getPath('userData'), "./Data/")

/** 
* @function dumpStr - Function to convert list object or array of questions to a string
* @param {Array} questions - array of questions
* @return {String} - the output string corresponding to the questions array
*/
function dumpStr(questions) {
  let output = ""

  for (let i = 0; i < questions.length; i++) {
    let answers = questions[i]["ANSWERS"]
    let line

    // convert object to a string using ES6 templates
    if (questions[i]["TYPE"] === "text") {
      line = `${questions[i]["TYPE"]}\t${questions[i]["TITLE"]}\t${answers.join(";")}\t${questions[i]["IMAGE_ID"] ? questions[i]["IMAGE_ID"] : "undefined"}\t${questions[i]["IMAGE_NAME"] ? questions[i]["IMAGE_NAME"] : "undefined"}\t${questions[i]["INCORRECT"] ? questions[i]["INCORRECT"] : "0"}\n`
    } else if (questions[i]["TYPE"] === "multi") {
      line = `${questions[i]["TYPE"]}\t${questions[i]["TITLE"]}\t${answers.join(";")}\t${questions[i]["CORRECT"]}\t${questions[i]["IMAGE_ID"] ? questions[i]["IMAGE_ID"] : "undefined"}\t${questions[i]["IMAGE_NAME"] ? questions[i]["IMAGE_NAME"] : "undefined"}\t${questions[i]["INCORRECT"] ? questions[i]["INCORRECT"] : "0"}\n`
    }

    output += line
  }

  return output
}

/** 
* @function loadStr - function to convert a string to an array of questions - reverse of dumpStr method
* @param {String} string - the string to be converted
* @return {Array} - array of questions
*/
function loadStr(string) {
  let questions = []

  const lines = string.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const params = lines[i].split("\t") // split on the main delimiter (a tab character)

    if (params[0] === "text") { // if the type is text, add all metadata on the question into an object and push it to the questions array
      questions.push({
        "TITLE": params[1], // the questions itself
        "TYPE": params[0], // the type of the question, "text" or "multi"
        "ANSWERS": params[2].split(";"), // the correct answers, multiple correct answers are delimited using a ";"
        "IMAGE_ID": params[3] === "undefined" ? null : params[3], // the id of the image (redundant) (if it exists)
        "IMAGE_NAME": params[4] === "undefined" ? null : params[4], // the name of the image (if it exists)
        "INCORRECT": parseInt(params[5]) // the number of times the user has answered incorrectly, for practice mode
      })
    } else if (params[0] === "multi") { // otherwise, add all (slightly different) metadata on th equestion into an object and push it to the questions array
      questions.push({
        "TITLE": params[1],
        "TYPE": params[0],
        "ANSWERS": params[2].split(";"),
        "CORRECT": parseInt(params[3]), // the index of the correct answer
        "IMAGE_ID": params[4] === "undefined" ? null : params[4],
        "IMAGE_NAME": params[5] === "undefined" ? null : params[5],
        "INCORRECT": parseInt(params[6])
      })
    }
  }

  return questions
}

/** 
* @function saveList - function to save a created/edited list to the filesystem
* @param {Array} questions - the array of questions to be saved
* @param {String} name - the name of the list
* @param {String} pathStr - the path where the list should be save
*/
export async function saveList(questions, name, pathStr) {
  // convert pathStr to a filesystem path
  const pathS = pathStr.split('-')
  let file = dataFolder

  if (pathS[0] === "Home") {
    file = path.join(file, name + ".list")
  } else {
    for (let i = 0; i < pathS.length; i++) {
      file = path.join(file, pathS[i])
    }
    file = path.join(file, name + ".list")
  }

  const contents = dumpStr(questions) // get the string representation of the questions array

  fs.writeFile(file, contents, (err) => { // write the string to disk
    if (err) throw err
  })
}

/** 
* @function loadList - function to load the list file
* @param {String} pathStr - the path to the list
* @return {Array} - the array of questions
*/
export function loadList(pathStr) {
  // convert pathStr to a filesystem path
  const pathS = pathStr.split('-')
  let file = dataFolder

  for (let i = 0; i < pathS.length; i++) {
    file = path.join(file, pathS[i])
  }

  // load the questions
  const questions = loadStr(fs.readFileSync(file, 'utf-8', (err) => {
    if (err) throw err
    console.log(`read ${file}`)
  }))

  return questions
}
