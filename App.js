import React, { useState } from 'react';
import Stepper from './Components/Stepper';
import { StepperContext } from './Components/contexts/StepperContext';
import StepperControl from './Components/StepperControl';
import Personal from './Components/steps/Personal';
import Contact from './Components/steps/Contact';
import Account from './Components/steps/Account';
import Final from './Components/steps/Final';
import Summary from './Components/steps/Summary';
import { useForm, FormProvider } from 'react-hook-form';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const methods = useForm();

  const steps = [
    "Personal Information",
    "Contact Information",
    "Sign Up",
    "Summary",
    "Account Setup"
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Personal onSubmitForm={onSubmitForm}/>;
      case 2:
        return <Contact />;
      case 3:
        return <Account />;
      case 4:
        return <Summary formData={userData} />;
      case 5:
        return <Final />;
      default:
        return null;
    }
  };

  const onSubmitForm = async (data) => {
    setUserData(prevState => ({ ...prevState, ...data }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNextClick = async () => {
    if (currentStep === 1) {
      const personalForm = document.getElementById('personalForm');
      if (personalForm) {
        const event = new Event('submit', { cancelable: true, bubbles: true });
        personalForm.dispatchEvent(event);
        if (event.defaultPrevented) {
          return;
        }
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className='bg-indigo-950'>
      <div className='text-center mb-4'>
        <h1>.</h1>
        <h1 className='text-4xl font-bold text-white shadow-lg bg-500 py-2 px-4 rounded-lg'>
          Multi Step Registration Form !
        </h1>
      </div>
      <div className='md:w-3/5 mx-auto shadow-2xl rounded-2xl pb-2 bg-blue-100 flex flex-col'>
        <div className='container horizontal mt-5'>
          <Stepper
            steps={steps}
            currentStep={currentStep}
          />
        </div>

        <div className="my-10 p-10">
          <FormProvider {...methods}>
            <StepperContext.Provider value={{
              userData,
              setUserData,
              finalData,
              setFinalData
            }}>
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </FormProvider>
        </div>

        {currentStep === steps.indexOf("Summary") + 1 && (
          <div className="flex flex-col items-center mb-5">
            <div className="flex items-center my-4">
              <input
                type="checkbox"
                id="terms"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-800">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        )}

        {currentStep !== steps.length && (
          <div className="flex flex-col items-center mb-5">
            <StepperControl
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              currentStep={currentStep}
              steps={steps}
              isCheckboxChecked={isCheckboxChecked}
            />
          </div>
        )}
      </div>
      <h1>.</h1>
      <h1>.</h1>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Jobs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Press</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Accessibility</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Partners</a>
          </div>
        </div>
        <div className="container mx-auto text-center mt-4">
          <p className="text-gray-600">©2024 Anuradha Naidu, Inc. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default App;
