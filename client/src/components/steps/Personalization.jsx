import React from 'react';
import Dropdown from '../Dropdown';

// Rest of the code..
import { useStepperContext } from "../../contexts/StepperContext";

export default function Personalization() {
  const { userData, setUserData } = useStepperContext();
  const newsletterFrequencyOptions = ['Daily', 'Weekly', 'Monthly'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Do you prefer more technical information or more general overveiws in your newsletter?
        </div>
        <div className="my-2">
          <Dropdown options={['Technical', 'General']}/>
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          How often would you like to recieve the newsletter?
        </div>
        <div className="my-2">
          <Dropdown options={newsletterFrequencyOptions}/>
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Do you have any other requests for the Newsletter?
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["requests"] || ""}
            name="requests"
            placeholder="Requests"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}