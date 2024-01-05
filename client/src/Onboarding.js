import { useState, useEffect } from "react";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import { useStepperContext } from "./contexts/StepperContext"; // Only useStepperContext is needed
import GeneralInfo from "./components/steps/GeneralInfo";
import Completed from "./components/steps/Complete";
import Personalization from "./components/steps/Personalization";
import Area1 from "./components/steps/Area1";
import Area2 from "./components/steps/Area2";
import Area3 from "./components/steps/Area3";
import backgroundImage from './signupBack.png';
import logoImage from './logo.png'; 

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useStepperContext(); // Using the context
  const [isStepValid, setIsStepValid] = useState(false);

  useEffect(() => {
    // Call a function to validate the current step
    validateCurrentStep();
  }, [userData, currentStep]);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // General Information step
        setIsStepValid(userData.FirstName && userData.LastName && userData.area1 && userData.area2 && userData.area3);
        break;
      case 2: // Area1 step
        setIsStepValid(userData.topics1 && userData.why1 && userData.expertise1);
        break;
      case 3: // Area2 step
        setIsStepValid(userData.topics2 && userData.why2 && userData.expertise2);
        break;
      case 4: // Area3 step
        setIsStepValid(userData.topics3 && userData.why3 && userData.expertise3); 
        break;
      case 5: // Personalization step
        setIsStepValid(userData.frequency && userData.scope);
        break;
      default:
        setIsStepValid(true);
    }
  };



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
        return <Area1 />;
      case 3:
        return <Area2 />;
      case 4:
        return <Area3 />;
      case 5:
        return <Personalization />;
      case 6:
        return <Completed />;
      default:
        return null;
    }
  };

  const regex = /^([^,]+,)+([^,]+)$/;

  const handleClick = (direction) => {
    if (direction === "next" && !isStepValid) {
      return; // Prevent going to the next step if current step is invalid
    }

    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // Check if steps are within bounds
    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',  // Changed to minHeight
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',  // Added padding
    }}>
      <img
        src={logoImage}
        alt="Logo"
        style={{
          width: "200px",
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
        {/* Stepper */}
        <div className="horizontal container mt-5">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="my-10 p-10">
            {displayStep(currentStep)} {/* Directly call displayStep without StepperContextProvider */}
          </div>
        </div>

        {/* Navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            isStepValid={isStepValid}
          />
        )}
      </div>
    </div>
  );
}

export default Onboarding;
