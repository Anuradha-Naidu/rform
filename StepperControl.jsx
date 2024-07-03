import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { StepperContext } from './contexts/StepperContext';

const StepperControl = ({ handleNextClick, handlePrevClick, currentStep, steps, isCheckboxChecked }) => {
  const formContext = useFormContext();
  const { userData } = useContext(StepperContext);

  const handleClick = async (direction) => {
    if (direction === "next") {
      if (currentStep === 1) {
        if (formContext) {
          const isValid = await formContext.trigger();
          if (!isValid) {
            return; // Do not proceed if the form is not valid
          }
        }
      }

      if (currentStep === steps.length - 1 && !isCheckboxChecked) {
        return; // Do not proceed if checkbox is not checked
      }
    }

    direction === "next" ? handleNextClick() : handlePrevClick();
  };

  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* Back button */}
      <button
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold 
          cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white
          transition-all duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => handleClick("prev")}
        disabled={currentStep === 1}
      >
        Previous
      </button>

      {/* Next or Confirm button */}
      <button
        className={`bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold 
          cursor-pointer hover:bg-purple-700 hover:text-white transition-all duration-200 ease-in-out
          ${currentStep === steps.length - 1 && !isCheckboxChecked ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => handleClick("next")}
        disabled={currentStep === steps.length - 1 && !isCheckboxChecked}
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
