import React, { useState, useEffect, useRef } from "react";
import { generate } from "random-words";

const difficultyLevels = {
  easy: { numWords: 30, time: 60 },
  medium: { numWords: 45, time: 45 },
  hard: { numWords: 60, time: 30 },
};

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(difficultyLevels.easy.time);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [difficulty, setDifficulty] = useState("easy");
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
    setCountDown(difficultyLevels[difficulty].time);
  }, [difficulty]);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
      const interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrInput("");
            return difficultyLevels[difficulty].time;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, difficulty]);

  function generateWords() {
    const { numWords } = difficultyLevels[difficulty];
    return new Array(numWords).fill(null).map(() => generate());
  }

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }

    if (status !== "started") {
      setStatus("started");
    }
  }

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else {
      return "";
    }
  }

  return (
    <div className="App">
      <div className="section">
        <label className="label">Select Difficulty:</label>
        <div className="control">
          <div className="select">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {/* <div className="display">
            <div className="section">
              <p className="is-size-5">Difficulty Level:</p>
              <p className="is-size-4 has-text-primary">{difficulty}</p>
            </div>

            <div className="section">
              <p className="is-size-5">Number of Words:</p>
              <p className="is-size-4 has-text-info">
                {difficultyLevels[difficulty].numWords}
              </p>
            </div>

            <div className="section">
              <p className="is-size-5">Time:</p>
              <p className="is-size-4 has-text-success">
                {difficultyLevels[difficulty].time} seconds
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="section">
        <div
          style={{ marginTop: "-100px" }}
          className="is-size-1 has-text-centered has-text-primary"
        >
          <h2>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input
          ref={textInput}
          disabled={status !== "started"}
          type="text"
          className="input"
          onKeyDown={handleKeyDown}
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>
          Start
        </button>
      </div>
      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>
                          {char}
                        </span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words per minute:</p>
              <p className="has-text-primary is-size-1">{correct}</p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              {correct !== 0 ? (
                <p className="has-text-info is-size-1">
                  {Math.round((correct / (correct + incorrect)) * 100)}%
                </p>
              ) : (
                <p className="has-text-info is-size-1">0%</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
