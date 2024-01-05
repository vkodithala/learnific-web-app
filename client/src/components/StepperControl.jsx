export default function StepperControl({ handleClick, currentStep, steps, isStepValid }) {
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      {/* Back Button */}
      <button
        onClick={() => currentStep !== 1 && handleClick('prev')}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${
          currentStep === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {/* Next/Confirm Button */}
      <button
        onClick={() => isStepValid && handleClick('next')}
        className={`cursor-pointer rounded-lg bg-mustard py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${
          !isStepValid ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={!isStepValid}
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}
