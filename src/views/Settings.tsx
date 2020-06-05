import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

import { ISettingsData } from "../types/Settings";
import { ICategory } from "../types/Question";

interface ISettingsProps {
  categories: ICategory[];
  startTrivia: (data: ISettingsData) => void;
}

function Settings(props: ISettingsProps) {
  const [qnsNum, setQuestionNum] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTypes, setSelectedTypes] = useState("");

  const setQnsNum = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionNum(parseInt(e.target.value));
  };

  const toggleCategories = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.value]);
    } else {
      const newSelectedCategories = selectedCategories.filter(
        (x) => x !== e.target.value
      );
      setSelectedCategories(newSelectedCategories);
    }
  };

  const toggleType = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTypes(e.target.value);
    }
  };

  const toggleDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDifficulty(e.target.value);
    }
  };

  const start = () => {
    props.startTrivia({
      categories: selectedCategories,
      qnsNum: qnsNum,
      difficulty: selectedDifficulty,
      qnsType: selectedTypes,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-5xl">Trivia Quiz</h1>
        <p>
          Based on{" "}
          <a
            href="https://opentdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {" "}
            Open Trivia Database
          </a>{" "}
        </p>
      </div>
      <div className="section__title">Categories</div>
      <div className="flex flex-col flex-wrap h-64">
        {props.categories &&
          props.categories.map((category: ICategory, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name="category"
                id={category.name}
                value={category.id}
                onChange={toggleCategories}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
      </div>
      <div className="section">
        <div className="section__title">Number of question</div>
        <input type="number" onChange={setQnsNum} placeholder="10" />
      </div>
      <div className="section">
        <div className="section__title">Difficulty</div>
        <input
          type="radio"
          name="difficulty"
          id="anyDifficulty"
          value=""
          onChange={toggleDifficulty}
        />
        <label htmlFor="anyDifficulty">Any difficulty</label>
        <input
          type="radio"
          name="difficulty"
          id="easy"
          value="easy"
          onChange={toggleDifficulty}
        />
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          name="difficulty"
          id="medium"
          value="medium"
          onChange={toggleDifficulty}
        />
        <label htmlFor="medium">Medium</label>
        <input
          type="radio"
          name="difficulty"
          id="hard"
          value="hard"
          onChange={toggleDifficulty}
        />
        <label htmlFor="hard">Hard</label>
      </div>

      <div className="section">
        <div className="section__title">Question type</div>
        <input
          type="radio"
          name="type"
          id="anyType"
          value=""
          onChange={toggleType}
        />
        <label htmlFor="anyType">Any type</label>
        <input
          type="radio"
          name="type"
          id="boolean"
          value="boolean"
          onChange={toggleType}
        />
        <label htmlFor="boolean">True/False</label>
        <input
          type="radio"
          name="type"
          id="multiple"
          value="multiple"
          onChange={toggleType}
        />
        <label htmlFor="multiple">Multiple choices</label>
      </div>

      <button className="action-button px-10" onClick={start}>
        Start
      </button>
    </div>
  );
}

export default Settings;
