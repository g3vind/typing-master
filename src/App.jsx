import { useState, useEffect } from "react";
import { generate } from "random-words";
import { numWords, time } from "./constants.js";
function App() {
  // state to set words to be typed
  const [words, setWords] = useState([]);

  // for timer
  const [countDown, setCountDown] = useState(time);

  // to set words after each render
  useEffect(() => {
    setWords(generateWords());
  }, []);

  // function to generate words
  function generateWords() {
    return new Array(numWords).fill(null).map(() => generate());
  }

  // function to start countdown
  function startCountDown() {
    let interval = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(interval);
        } else {
          return prevCountDown - 1;
        }
      });
    }, 1000);
  }

  return (
    <div className="App">
      {/* TITLE */}
      {/* <h1 className="title">
        <span className="one">Typing</span> <span className="two">Master</span>
      </h1> */}
      {/* FOR ACCURACY AND WPM */}
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>
      {/* START BUTTON */}
      <div className="section">
        <button
          className="button is-info is-fullwidth"
          onClick={startCountDown}
        >
          Start
        </button>
      </div>
      {/* FOR INPUT */}
      <div className="control is-expanded section">
        <input type="text" className="input" placeholder="type here..." />
      </div>
      <div className="section">
        <div className="card">
          <div className="card-content">
            {/* WORDS DISPLAY SECTION */}
            <div className="content">
              {words.map((word, i) => (
                <>
                  <span key={i}>{word}</span>
                  {i < words.length - 1 && (
                    <span key={`separator-${i}`}> </span>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
