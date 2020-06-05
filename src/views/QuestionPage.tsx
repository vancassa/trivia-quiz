import React, { useState, useEffect, DependencyList } from "react";
import { IQuestion } from "../types/Question";

import "./QuestionPage.css";

interface IProps {
  question: IQuestion;
  answerQuestion: (answer: string, correct: boolean) => void;
  hideChoices?: Boolean;
}

function QuestionPage(props: IProps) {
  const { question, hideChoices } = props;
  const [localHideChoices, setLocalHideChoices] = useState(false);

  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setLocalHideChoices(props.hideChoices as boolean);
    console.log('props.hideChoices :>> ', props.hideChoices);
  }, []);

  const answerQns = (answer: string) => {
    let correct = false;
    if (answer === question.correct_answer) {
      correct = true;
    }
    props.answerQuestion(answer, correct);
    window.scrollTo(0, 0);

    const choices: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      "button.choice"
    );
    choices.forEach((choice) => {
      choice.blur();
    });

    setLocalHideChoices(props.hideChoices as boolean);
    console.log("localHideChoices :>> ", localHideChoices);
  };

  const showAllChoices = () => {
    setLocalHideChoices(false);
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="font-bold">{decodeURIComponent(question.category)}</p>
      <h1 className="text-3xl mb-6">{decodeURIComponent(question.question)}</h1>
      {localHideChoices && (
        <button className="mb-6 cursor-pointer" onClick={showAllChoices}>
          Show choices
        </button>
      )}
      {!localHideChoices &&
        answers.map((answer, index) => (
          <button
            key={index}
            className="choice p-5 block w-full mb-4 border border-gray-500 rounded cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              answerQns(answer);
            }}
          >
            {decodeURIComponent(answer)}
          </button>
        ))}
    </div>
  );
}

export default QuestionPage;
