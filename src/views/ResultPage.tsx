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
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <div>Your answer</div>
          <ol>
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
          <div>Correct answer</div>
          <ol>
            {questions.map((qns, idx) => (
              <li key={idx}>{decodeURIComponent(qns.correct_answer)}</li>
            ))}
          </ol>
        </div>
      </div>
      <h1>
        Score: {score}/{questions.length}
      </h1>
      <button onClick={props.restart}> Try again</button>
    </div>
  );
}

export default ResultPage;
