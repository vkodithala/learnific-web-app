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

      <div class="flex flex-row bg-gray-800 px-8 py-7 text-slate-50">
        <div class="basis-1/6 font-semibold">Experimental Flights VIP</div>
        <div class="basis-1/4"><button class="hover:text-sky-300 ease-in duration-200 font-semibold">Create New</button></div>
        <div class="basis-1/4"></div>
      </div>
    </body>
    </>
  );
}

export default App;