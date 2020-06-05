import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import "./styles/tailwind.css";

import Settings from "./views/Settings";
import QuestionPage from "./views/QuestionPage";
import ResultPage from "./views/ResultPage";

import { ISettingsData } from "./types/Settings";
import { IQuestion, ICategory } from "./types/Question";

const qns_dummy = [
  {
    category: "Entertainment%3A%20Music",
    type: "multiple",
    difficulty: "hard",
    question: "Where%20was%20Nicki%20Minaj%20born%3F",
    correct_answer: "Trinidad%20and%20Tobago",
    incorrect_answers: ["Haiti", "Saint%20Lucia", "Grenada"],
  },
  {
    category: "Entertainment%3A%20Film",
    type: "multiple",
    difficulty: "medium",
    question:
      "What%20does%20TIE%20stand%20for%20in%20reference%20to%20the%20TIE%20Fighter%20in%20%22Star%20Wars%22%3F",
    correct_answer: "Twin%20Ion%20Engine",
    incorrect_answers: [
      "Twin%20Iron%20Engine",
      "Twin%20Intercepter%20Engine",
      "Twin%20Inception%20Engine",
    ],
  },
];

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQnsIndex, setCurrentQnsIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  // On mount
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      const categories = response.data.trivia_categories;
      categories.sort((a: ICategory, b: ICategory) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
      });
      setCategories(categories);
    });
  }, []);

  const startTrivia = (data: ISettingsData) => {
    let urls: string[] = [];
    const totalQns = data.qnsNum;
    const difficulty = data.difficulty;
    const type = data.qnsType;
    const categoriesLength = data.categories.length;

    // Fetch all data
    if (categoriesLength > 0) {
      const remainder = totalQns % categoriesLength;
      const roundUp = Math.ceil(totalQns / categoriesLength);
      const roundDown = Math.floor(totalQns / categoriesLength);
      const randomizedCategories = [...data.categories];
      randomizedCategories.sort(() => Math.random() - 0.5);

      let amount;
      randomizedCategories.forEach((category, index) => {
        amount = index < categoriesLength - remainder ? roundDown : roundUp;
        urls.push(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`
        );
      });
    } else {
      urls.push(
        `https://opentdb.com/api.php?amount=${totalQns}&difficulty=${difficulty}&type=${type}&encode=url3986`
      );
    }

    let allQns: IQuestion[] = [];
    Promise.all(urls.map((url) => axios.get(url))).then((responses) => {
      responses.forEach((res: any) => {
        allQns = allQns.concat(res.data.results);
      });
      setQuestions(allQns);
    });
  };

  const answerQuestion = (answer: string, correct: boolean) => {
    setAnswers([...answers, answer]);
    if (correct) setScore(score + 1);
    setCurrentQnsIndex(currentQnsIndex + 1);
  };

  const restart = () => {
    setQuestions([]);
    setCurrentQnsIndex(0);
    setAnswers([]);
    setScore(0);
  };

  return (
    <div className="App pt-6">
      {questions && questions.length > 0 ? (
        currentQnsIndex < questions.length ? (
          <QuestionPage
            question={questions[currentQnsIndex]}
            answerQuestion={answerQuestion}
          />
        ) : (
          <ResultPage
            questions={questions}
            answers={answers}
            score={score}
            restart={restart}
          />
        )
      ) : categories.length > 0 ? (
        <Settings categories={categories} startTrivia={startTrivia} />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
}

export default App;
