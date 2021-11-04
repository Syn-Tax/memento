import React from 'react';
import QuestionText from '../Components/QuestionText'
import QuestionMulti from '../Components/QuestionMulti'

const Components = {
  "text": QuestionText,
  "multi": QuestionMulti
}

/** 
* @function QuestionBlock - Component that allows the dynamic rendering of a component based on the type of the question
* @param {String} props.type - The type of component to be rendered - "text" is a text based answer, "multi" is a multiple-choice answer
* @return {JSX} - The JSX for the component
*/
function QuestionBlock(props) {
  return React.createElement(Components[props.type], props)
}

export default QuestionBlock
