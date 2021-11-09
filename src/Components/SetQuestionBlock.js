import React from 'react';
import SetQuestionText from '../Components/SetQuestionText'

const Components = {
    "text": SetQuestionText,
    "multi": SetQuestionText
}
/** 
* @function SetQuestionBlock - Component to allow the dynamic rendering of the question creation menu based on the question type
* @param {String} props.type - Question type - either "text" for a text based answer or "multi" for a multiple choice based answer
* @return {JSX} - The JSX for the component
*/
function SetQuestionBlock(props) {
    return React.createElement(Components[props.type], props)
}

export default SetQuestionBlock;
