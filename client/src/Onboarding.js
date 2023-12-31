import { useState, useEffect } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import {StepperContextProvider, useStepperContext} from "./contexts/StepperContext";
import GeneralInfo from "./components/steps/GeneralInfo";
import Completed from "./components/steps/Complete";
import Personalization from "./components/steps/Personalization";
import Area1 from "./components/steps/Area1";
import Area2 from "./components/steps/Area2";
import Area3 from "./components/steps/Area3";
import backgroundImage from './signupBack.png'; 

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useStepperContext();


  useEffect(() => {
    console.log("userData updated:", userData);
  }, [userData]);

  const steps = [
    "General Information",
    "Area 1",
    "Area 2",
    "Area 3",
    "Personalization",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <GeneralInfo />;
      case 2:
        return < Area1/>;
      case 3:
        return < Area2/>;
      case 4:
        return < Area3/>;
      case 5:
        return <Personalization />;
      case 6:
        return <Completed />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <StepperContextProvider>{displayStep(currentStep)}</StepperContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
    </div>
  );
}

export default Onboarding;