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
  const [disableButton, setDisableButton] = useState(false);

  const setQnsNum = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionNum(parseInt(e.target.value));
  };

  const addToCategories = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeFromCategories = (category: string) => {
    const newSelectedCategories = selectedCategories.filter(
      (x) => x !== category
    );
    setSelectedCategories(newSelectedCategories);
  };

  const toggleCategories = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addToCategories(e.target.value);
    } else {
      removeFromCategories(e.target.value);
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
    setDisableButton(true);
    props.startTrivia({
      categories:
        selectedCategories.length === props.categories.length
          ? []
          : selectedCategories,
      qnsNum: qnsNum,
      difficulty: selectedDifficulty,
      qnsType: selectedTypes,
    });
  };

  const selectAll = () => {
    var checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    let categories = [];
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      addToCategories(checkboxes[i].value);
      categories.push(checkboxes[i].value);
    }
    setSelectedCategories(categories);
  };

  const unselectAll = () => {
    var checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setSelectedCategories([]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl">Trivia Quiz</h1>
        <p>
          By{" "}
          <a
            href="https://github.com/vancassa/trivia-quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {" "}
            @vancassa
          </a>{" "}
          based on{" "}
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
      <div
        className="inline-block underline cursor-pointer"
        onClick={selectAll}
      >
        Select all
      </div>
      <div
        className="inline-block underline cursor-pointer ml-4"
        onClick={unselectAll}
      >
        Unselect all
      </div>
      <div className="flex flex-col flex-wrap lg:h-64">
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
        <input type="number" onChange={setQnsNum} placeholder="5" />
      </div>
      <div className="section">
        <div className="section__title">Difficulty</div>
        <div>
          <input
            type="radio"
            name="difficulty"
            id="anyDifficulty"
            value=""
            onChange={toggleDifficulty}
          />
          <label htmlFor="anyDifficulty">Any difficulty</label>
        </div>
        <div>
          <input
            type="radio"
            name="difficulty"
            id="easy"
            value="easy"
            onChange={toggleDifficulty}
          />
          <label htmlFor="easy">Easy</label>
        </div>
        <div>
          <input
            type="radio"
            name="difficulty"
            id="medium"
            value="medium"
            onChange={toggleDifficulty}
          />
          <label htmlFor="medium">Medium</label>
        </div>
        <div>
          <input
            type="radio"
            name="difficulty"
            id="hard"
            value="hard"
            onChange={toggleDifficulty}
          />
          <label htmlFor="hard">Hard</label>
        </div>
      </div>

      <div className="section">
        <div className="section__title">Question type</div>
        <div>
          <input
            type="radio"
            name="type"
            id="anyType"
            value=""
            onChange={toggleType}
          />
          <label htmlFor="anyType">Any type</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="boolean"
            value="boolean"
            onChange={toggleType}
          />
          <label htmlFor="boolean">True/False</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="multiple"
            value="multiple"
            onChange={toggleType}
          />
          <label htmlFor="multiple">Multiple choices</label>
        </div>
      </div>

      <button className="action-button px-10" onClick={start} disabled={disableButton}>
        Start
      </button>
    </div>
  );
}

export default Settings;
