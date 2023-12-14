import React from "react";
import { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [ userInput, setInputValue ] = useState("");
  const [ inputType, setInputType ] = useState("");
  const [ responseData, setResponseData ] = useState("");
  const sendInput = async (e) => {
    console.log(userInput);
    console.log(inputType);
    e.preventDefault();
    try {
      const response = await fetch("/get_data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput })
      })
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData.result);
        setResponseData(responseData.result);
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex items-center flex-col border-2 border-sky-500 p-10 rounded-lg shadow-lg min-w-lg max-w-xl">
        <h1 className="text-4xl font-bold underline decoration-sky-500 py-2 mb-2">learnific</h1>
        <div className="flex flex-col gap-2">
          <input onChange={ (e) => setInputValue(e.target.value) } type="text" placeholder="i want to learn about..." className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none shadow-sm pr-3 pl-3 py-2"></input>
          <select onChange={ (e) => setInputType(e.target.value) } className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none shadow-sm pr-3 pl-3 py-2">
            <option value="google_scholar">academic</option>
            <option value="google">non-academic</option>
          </select>
          <button className="border-2 bg-sky-200 border-sky-500 text-sky-900 font-bold text-lg rounded-lg shadow-sm pr-3 pl-3 py-2 hover:bg-sky-900 hover:text-white transition ease-in-out delay-150" onClick={ sendInput }>answer my question</button>
          <div className="bg-sky-50 border-2 border-sky-500 max-w-sm rounded overflow-hidden shadow-lg mt-2">
            <div className="p-3 max-h-[200px] overflow-y-auto">
              { responseData }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
export default App;