import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Box, Grid, makeStyles, Fab } from '@material-ui/core';
import { loadList } from '../Utils/List';
import BackButton from '../Components/BackButton';
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab"
import queryString from 'query-string'

const styles = makeStyles({
    root: {
        color: "#424242",
        '&$selected': {
            backgroundColor: "#548BDF",
            color: "white"
        },
        '&$selected:hover': {
            backgroundColor: "#548BDF",
            color: "white"
        }
    },
    selected: {}
})

function List(props) {
    const { pathStr } = useParams()
    const { search } = useLocation()
    const [speed, setSpeed] = React.useState("none")
    const [question, setQuestion] = React.useState("none")
    const [type, setType] = React.useState("normal")

    const classes = styles()

    const queryStr = queryString.parse(search)

    let questions = loadList(pathStr)

    if (queryStr["practice"] === "true") {
        questions = questions.filter(question => {
            console.log(question)
            return question["INCORRECT"] > 0
        })
    }
    let parent_path

    if (pathStr.split("-").length > 1) {
        parent_path = "/folder/" + pathStr.split("-").slice(0, -1).join("-")
    } else {
        parent_path = "/"
    }

    const name = pathStr.split("-")[pathStr.split("-").length-1].slice(0, -5)

    const handleSpeed = (event, newSpeed) => {
        setSpeed(newSpeed)
    }
    
    const handleQuestion = (event, newQuestions) => {
        setQuestion(newQuestions)
    }
    
    const handleType = (event, newType) => {
        setType(newType)
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <Link to={parent_path}>
                        <BackButton />
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <h1 style={{ fontSize: "17pt", top: "2vh", textAlign: "center", position: "absolute" }} >{name}</h1>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Grid container spacing={3} style={{ top: "7%", position: "absolute" }}>
                <Grid item xs={5}>
                    <Box boxShadow={10} style={{ width: "35vw", height: "90vh", left: "4%", backgroundColor: "white", position: "absolute", borderRadius: "20px" }}>
                        <Grid container style={{ paddingTop: "5%", fontSize: "14pt" }}>
                            <Grid item xs={3}>Question</Grid>
                            <Grid item xs={4}>Multiple Choice</Grid>
                            <Grid item xs={5}>Correct Answer(s)</Grid>
                        </Grid>
                        {questions.map((question, i) => {
                            return (
                                <Grid container style={{ paddingTop: "3%" }}>
                                    <Grid item xs={3}>{question["TITLE"]}</Grid>
                                <Grid item xs={4}>{question["TYPE"] === "multi" ? "yes" : "no"}</Grid>
                                  {question["TYPE"] === "multi" ? <Grid item xs={5}>{question["ANSWERS"][question["CORRECT"]]}</Grid> : <Grid item xs={5}>{question["ANSWERS"].join(";")}</Grid>}
                                </Grid>
                            )
                        })}
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Box boxShadow={10} style={{ width: "54vw", height: "90vh", backgroundColor: "white", position: "absolute", borderRadius: "20px" }}>
                        <div style={{ paddingTop: "5%" }}>
                            <h1 style={{ paddingBottom: "2%" }}>Speed:</h1>
                            <ToggleButtonGroup exclusive value={speed} onChange={handleSpeed}>
                                <ToggleButton value="none" classes={{root: classes.root, selected: classes.selected}}>No Limit</ToggleButton>
                                <ToggleButton value="slow" classes={{root: classes.root, selected: classes.selected}}>Slow</ToggleButton>
                                <ToggleButton value="medium" classes={{root: classes.root, selected: classes.selected}}>Medium</ToggleButton>
                                <ToggleButton value="fast" classes={{root: classes.root, selected: classes.selected}}>Fast</ToggleButton>
                                <ToggleButton value="eat_my_dust" classes={{root: classes.root, selected: classes.selected}}>Eat My Dust</ToggleButton>

                            </ToggleButtonGroup>
                        </div>

                        <div style={{ paddingTop: "5%" }}>
                            <h1 style={{ paddingBottom: "2%" }}>Number of Questions:</h1>
                            <ToggleButtonGroup exclusive value={question} onChange={handleQuestion}>
                                <ToggleButton value="none" classes={{root: classes.root, selected: classes.selected}}>No Limit</ToggleButton>
                                <ToggleButton value="10" classes={{root: classes.root, selected: classes.selected}}>10</ToggleButton>
                                <ToggleButton value="20" classes={{root: classes.root, selected: classes.selected}}>20</ToggleButton>
                                <ToggleButton value="50" classes={{root: classes.root, selected: classes.selected}}>50</ToggleButton>
                                <ToggleButton value="100" classes={{root: classes.root, selected: classes.selected}}>100</ToggleButton>

                            </ToggleButtonGroup>
                        </div>
                        { /*
                        <div style={{ paddingTop: "5%" }}>
                            <h1 style={{ paddingBottom: "2%" }}>Given Question find answer, or reverse? (NOT WORKING)</h1>
                            <ToggleButtonGroup exclusive value={type} onChange={handleType}>
                                <ToggleButton value="normal" classes={{root: classes.root, selected: classes.selected}}>Normal</ToggleButton>
                                <ToggleButton value="reverse" classes={{root: classes.root, selected: classes.selected}}>Reverse</ToggleButton>

                            </ToggleButtonGroup>
                        </div>
                          */ }

                        <div style={{ paddingTop: "5%" }}>
                        <Link to={`/test/${pathStr}?speed=${speed}&question=${question}&type=${type}&practice=${queryStr["practice"]}`}><Fab variant="extended" style={{backgroundColor: "white"}}>START</Fab></Link>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default List;
