import React from 'react';
import Dropdown from '../Dropdown';

// Rest of the code..
import { useStepperContext } from "../../contexts/StepperContext";

export default function Personalization() {
  const { userData, setUserData } = useStepperContext();
  const newsletterFrequencyOptions = ['Daily', 'Weekly'];
  const newsletterScopeOptions = ['General', 'Technical'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold mt-3 text-gray-500 text-xs uppercase">
          Do you prefer more technical info or general overivews in your newsletter?
        </div>
        <div className="my-2">
          <Dropdown options={newsletterScopeOptions}
          onChange={handleChange}
          value={userData["scope"] || ""}
          name="scope"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold mt-3 text-gray-500 text-xs uppercase">
          How often would you like to receive your personalized newsletter?
        </div>
        <div className="my-2">
          <Dropdown options={newsletterFrequencyOptions}
          onChange={handleChange}
          value={userData["frequency"] || ""}
          name="frequency"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold mt-3 text-gray-500 text-xs uppercase">
          Any other requests for our content curators?
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["other"] || ""}
            name="other"
            placeholder="other"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}