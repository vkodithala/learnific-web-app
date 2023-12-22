import './App.css';
import { SignUpBar } from "./components/SignUpBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { SignUpForm } from "./components/SignUpForm";
import { questions } from "./Questions";
import { Link } from 'react-router-dom';

function App() {
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalPagesCount = questions?.length || 0;
  const [pagesAnswers, setPagesAnswers] = useState({});

  useEffect(() => {
    console.log(pagesAnswers);
  }, [pagesAnswers]);

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }

  const nextButton = () => {
    if (index < totalPagesCount) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
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

  const prevAnswers = pagesAnswers || [];

  return (
    <div className="App">
      <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
            <SignUpBar step={index} />
          </Col>
        </Row>
        <Row>
          {submitted ? (
            <Card className="custom-card">
              <Card.Body className="custom-card-title">
                <p>Your answers have been submitted!</p>
              </Card.Body>
              <Card.Footer>
                <Link to="/Personalities">
                  <Button onClick={handleStart}>Choose Personalities</Button>
                </Link>
              </Card.Footer>
            </Card>
          ) : (
            <Card className="m-5">
              <Card.Body>
                <SignUpForm
                  list={questions}
                  step={index}
                  onPageUpdate={onPageAnswerUpdate}
                  pagesAnswers={pagesAnswers}
                  prevAnswers={prevAnswers}
                />
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button onClick={prevButton} disabled={index === 1}>
                  Previous
                </Button>
                <Button onClick={nextButton}>
                  {index === totalPagesCount ? "Submit" : "Next"}
                </Button>
              </Card.Footer>
            </Card>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;