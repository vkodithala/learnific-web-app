import React from "react";
import { useState, useEffect } from "react";
import './App.css';

const App = () => {
  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()

    ).then(
      data => {
        console.log(data)
      }
    );
  }, [])
  return (
    <>
    <body>
      <div class="px-5 py-5">
        <div class="flex flex-col">
          <h1 class="text-4xl font-bold underline decoration-sky-500 py-2">learnific</h1>
          <div class="flex flex-row gap-2">
            <input type="text" placeholder="i want to learn about..." class="border border-gray-300 text-gray-900 text-lg rounded-lg w-1/4 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none shadow-sm pr-3 pl-3 py-2"></input>
            <button class="border-2 bg-sky-200 border-sky-500 text-sky-900 font-bold text-lg rounded-lg w-1/8 shadow-sm pr-3 pl-3 py-2 hover:bg-sky-900 hover:text-white transition ease-in-out delay-150 hover:scale-110">Submit</button>
          </div>
        </div>
      </div>
    </body>
    </>
  );
}

export default App;