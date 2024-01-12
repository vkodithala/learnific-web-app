import { useStepperContext, StepperContext } from "../../contexts/StepperContext";
import useContext from "react";
import Dropdown from "../Dropdown";
export default function Area1() {
  const { userData, setUserData } = useStepperContext();
  const expertiseOptions = ['1: No Clue', '2: Beginner', '3: Intermediate', '4: Advanced', '5: Expert'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
 

  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold mt-3 text-gray-500 text-xs uppercase">
          What subtopics within <span style="font-size: larger; font-weight: bold;">{userData['area1']}</span> draw your attention?
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
            onChange={handleChange}
            value={userData["topics1"] || ""}
            name="topics1"
            placeholder="i.e. Natural Language Processing, Alzheimer's Prevention, Biodiversity"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold mt-3 text-gray-500 text-xs uppercase">
          Why does {userData['area1']} interest you? Be specific!
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["why1"] || ""}
            name="why1"
            placeholder="i.e. I'm fascinated by the applications of AI in disease prevention and diagnosis"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}