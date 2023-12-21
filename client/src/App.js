import './App.css';
import { SignUpBar } from "./components/SignUpBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { SignUpForm } from "./components/SignUpForm";
import { questions } from "./Questions";

function App() {
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalPagesCount = questions?.length || 0;
  // numbered by pages. for exampe { 1: [{"key" : "value"}], 2:["key": "value"], 3: []}
  const [pagesAnswers, setPagesAnswers] = useState({});

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }

  const nextButton = () => {
    if (index - 8) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      // clear the form on submit
      setPagesAnswers({});
      setSubmitted(true);
    }
  }

  const onPageAnswerUpdate = (step, answersObj) => {
    setPagesAnswers({...pagesAnswers, [step]: answersObj});
  }

  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  }

  return (
    <div className="App">
      <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
            <SignUpBar
              step={index}
              />
          </Col>
        </Row>
        <Row>
          {
            submitted ?
            <Card>
              <Card.Body>
                <p>Your answers have been submitted!</p>
              </Card.Body>
              <Card.Footer>
                <Button onClick={handleStart}>Start Over</Button>
              </Card.Footer>
            </Card> :
          <Card>
            <Card.Body>
              <SignUpForm
                list={questions}
                step={index}
                onPageUpdate={onPageAnswerUpdate}
                pagesAnswers={pagesAnswers}
                />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Button onClick={prevButton} disabled={index == 1}>Previous</Button>
              <Button onClick={nextButton}>{index == totalPagesCount ? 'Submit' : 'Next'}</Button>
            </Card.Footer>
          </Card>
        }
        </Row>
      </Container>
    </div>
  );
}

export default App;



// import React from "react";
// import { useState, useEffect } from "react";
// import './App.css';

// // const App = () => {
// //   const [ userInput, setInputValue ] = useState("");
// //   const [ inputType, setInputType ] = useState("");
// //   const [ responseData, setResponseData ] = useState("");
// //   const sendInput = async (e) => {
// //     console.log(userInput);
// //     console.log(inputType);
// //     e.preventDefault();
// //     try {
// //       const response = await fetch("/get_data", {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ prompt: userInput })
// //       })
// //       if (response.status === 200) {
// //         const responseData = await response.json();
// //         console.log(responseData.result);
// //         setResponseData(responseData.result);
// //       } else {
// //         console.error(`Request failed with status code ${response.status}`);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// //   return (
// //     <div className="flex justify-center items-center h-screen w-screen">
// //       <div className="flex items-center flex-col border-2 border-sky-500 p-10 rounded-lg shadow-lg min-w-lg max-w-xl">
// //         <h1 className="text-4xl font-bold underline decoration-sky-500 py-2 mb-2">learnific</h1>
// //         <div className="flex flex-col gap-2">
// //           <input onChange={ (e) => setInputValue(e.target.value) } type="text" placeholder="i want to learn about..." className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none shadow-sm pr-3 pl-3 py-2"></input>
// //           <select onChange={ (e) => setInputType(e.target.value) } className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none shadow-sm pr-3 pl-3 py-2">
// //             <option value="google_scholar">academic</option>
// //             <option value="google">non-academic</option>
// //           </select>
// //           <button className="border-2 bg-sky-200 border-sky-500 text-sky-900 font-bold text-lg rounded-lg shadow-sm pr-3 pl-3 py-2 hover:bg-sky-900 hover:text-white transition ease-in-out delay-150" onClick={ sendInput }>answer my question</button>
// //           <div className="bg-sky-50 border-2 border-sky-500 max-w-sm rounded overflow-hidden shadow-lg mt-2">
// //             <div className="p-3 max-h-[200px] overflow-y-auto">
// //               { responseData }
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// //   }
// // export default App;