import React from 'react';
import Answer from '../Answer/Answer.jsx';

const AnswerList = function(props) {
  return (
    <section>
      {// Sort answers in desc order by helpfulness & render an Answer component for each sorted question
      props.answers
        .sort((a,b) => b.helpfulness - a.helpfulness)
        .map(answer => (
          <Answer
            key={answer.id}
            answer={answer}
            updateHelp={props.updateHelp}
          />
        ))
      }
    </section>
  );
};

export default AnswerList;