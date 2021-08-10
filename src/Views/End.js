import React from 'react'
import { useLocation, useParams, Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { Fab } from "@material-ui/core"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

function End(props) {
  const { search } = useLocation()
  const { pathStr } = useParams()

  const queryStr = queryString.parse(search)

  const history = useHistory()

  const continueButtonClick = () => {
    let split = pathStr.split('-')
    let path

    if (split.length === 1) {
      path = "/"
    } else {
      split.pop()
      path = "/folder/"+split.join("-")
    }

    console.log(path)
    history.push(path)
  }

  return (
    <div>
      <div>
        <div style={{ paddingTop: "25vh", fontSize: "25pt" }}>Well Done! Your score is below:</div>
        <div style={{ paddingTop: "2vh", fontSize: "50pt" }}>{Math.round(queryStr["correct"]/queryStr["total"]*100)}%</div>
        <div style={{ paddingTop: "1vh", fontSize: "25pt" }}>Correct: {queryStr["correct"]}</div>
        <div style={{ paddingTop: "0.5vh", fontSize: "25pt" }}>Total: {queryStr["total"]}</div>
        <Fab variant="extended" style={{ backgroundColor: "white", position: "absolute", top: "80vh", right: "25vw" }} onClick={continueButtonClick}>
          <KeyboardArrowRightIcon style={{ opacity: 0.7 }} />
          Continue
        </Fab>
      </div>
    </div>
  )
}

export default End
