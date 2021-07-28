import React from 'react';
import QuestionText from '../Components/QuestionText'
import QuestionMulti from '../Components/QuestionMulti'

const Components = {
  "text": QuestionText,
  "multi": QuestionMulti
}

function QuestionBlock(props) {
  return React.createElement(Components[props.type], props)
}

export default QuestionBlock
