import React from 'react';
import SetQuestionText from '../Components/SetQuestionText'

const Components = {
    "text": SetQuestionText,
    "multi": SetQuestionText
}

function SetQuestionBlock(props) {
    return React.createElement(Components[props.type], props)
}

export default SetQuestionBlock;
