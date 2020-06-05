import React from "react";
import { IQuestion } from "../types/Question";

import "./QuestionPage.css";

interface IProps {
  question: IQuestion;
  answerQuestion: (answer: string, correct: boolean) => void;
}

function QuestionPage(props: IProps) {
  const { question } = props;

  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  const answerQns = (answer: string) => {
    let correct = false;
    if (answer === question.correct_answer) {
      correct = true;
    }
    props.answerQuestion(answer, correct);
    window.scrollTo(0, 0);
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="font-bold">{decodeURIComponent(question.category)}</p>
      <h1 className="text-3xl mb-6">{decodeURIComponent(question.question)}</h1>
      {answers.map((answer, index) => (
        <button
          key={index}
          className="choice p-5 block w-full mb-4 border border-gray-500 rounded cursor-pointer"
          onClick={() => answerQns(answer)}
        >
          {decodeURIComponent(answer)}
        </button>
      ))}
    </div>
  );
}

export default QuestionPage;
