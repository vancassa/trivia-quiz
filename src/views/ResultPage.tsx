import React from "react";
import { IQuestion } from "../types/Question";

interface IProps {
  questions: IQuestion[];
  answers: string[];
  score: number;
  restart: () => void;
}

function ResultPage(props: IProps) {
  const { questions, answers, score } = props;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-evenly mb-10">
        <div>
          <div className="text-2xl font-bold">Your answers</div>
          <ol className="list-decimal ml-4">
            {answers.map((answer, idx) => (
              <li
                key={idx}
                style={{
                  color:
                    questions[idx] && answer === questions[idx].correct_answer
                      ? "green"
                      : "red",
                }}
              >
                {decodeURIComponent(answer)}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="text-2xl font-bold">Correct answers</div>
          <ol className="list-decimal ml-4">
            {questions.map((qns, idx) => (
              <li key={idx}>{decodeURIComponent(qns.correct_answer)}</li>
            ))}
          </ol>
        </div>
      </div>
      <h1 className="text-4xl text-center mb-10">
        Score: {score}/{questions.length}
      </h1>
      <div className="flex">
        <button className="action-button" onClick={props.restart}>
          Play again
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
