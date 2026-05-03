import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import myLogo from "./mylogo.gif";
import { evaluate } from "mathjs";

function App() {

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch History
  const getHistory = async () => {

    const res = await axios.get(
      "https://calcify-backend-vk9r.onrender.com/history"
    );

    setHistory(res.data);
  };

  useEffect(() => {
    getHistory();
  }, []);

  // Handle Click
  const handleClick = (value) => {
    setInput(input + value);
  };

  // Clear Input
  const clearInput = () => {
    setInput("");
  };

  // Delete History
  const clearHistory = async () => {

    try{

      await axios.delete(
        "https://calcify-backend-vk9r.onrender.com/delete"
      );

      setHistory([]);

    }catch(error){

      console.log(error);
    }

  };

  // Calculate
  const calculate = async () => {

    try {

    const result = evaluate(input).toString();  
    setInput(result);

      await axios.post(
        "https://calcify-backend-vk9r.onrender.com/save",
        {
          expression: input,
          result: result
        }
      );

      getHistory();

    } catch (error) {

      setInput("Error");
    }
  };

  return (

    <div className="container">

      {/* CALCULATOR */}

      <div className="calculator">

        <img
          src={myLogo}
          alt="logo"
          className="logo"
        />

        <h1>Calculator</h1>

        <input
          type="text"
          value={input}
          readOnly
        />

        <div className="buttons">

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>

          <button
            className="operator"
            onClick={() => handleClick("/")}
          >
            ÷
          </button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>

          <button
            className="operator"
            onClick={() => handleClick("*")}
          >
            ×
          </button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>

          <button
            className="operator"
            onClick={() => handleClick("-")}
          >
            −
          </button>

          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>

          <button
            className="equal"
            onClick={calculate}
          >
            =
          </button>

          <button
            className="operator"
            onClick={() => handleClick("+")}
          >
            +
          </button>

          <button
            className="clear"
            onClick={clearInput}
          >
            Clear
          </button>

        </div>

      </div>

      {/* HISTORY */}

      <div className="history">

        <h2>History</h2>

        <div className="history-list">

          {
            history.map((item, index) => (

              <div
                key={index}
                className="history-item"
              >

                <p>
                  {item.expression} = {item.result}
                </p>

              </div>

            ))
          }

        </div>

        <button
          className="delete-history"
          onClick={clearHistory}
        >
          Delete History
        </button>

      </div>

    </div>

  );

}

export default App;