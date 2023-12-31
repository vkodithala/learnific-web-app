import { useStepperContext, StepperContext } from "../../contexts/StepperContext";
import useContext from "react";
import Rating from "../rating";
import Dropdown from "../Dropdown";
export default function Area1() {
  const { userData, setUserData } = useStepperContext();
  const expertiseOptions = ['1: No Clue', '2: Beginner', '3: Intermediate', '4: Advanced', '5: Expert'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const firstArea = typeof userData['areas'] === 'string' ? userData['areas'].split(",")[0] : 'Area';

  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          What specifically about {firstArea} interests you? ([SHOW EXAMPLES])
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
            onChange={handleChange}
            value={userData["topics1"] || ""}
            name="topics1"
            placeholder="NLP, LLM, Transformers, etc."
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Why does {firstArea} facinate you? The more specific the better!
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["why1"] || ""}
            name="why1"
            placeholder="I am new to the world of AI and I am facinated by ..."
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Rate your expertice in {firstArea} from 1-5
        </div>
        <div className="my-2">
          <Dropdown 
            options={expertiseOptions} 
            onChange={handleChange}
            value={userData["expertise1"] || ""}
            name="expertise1"
          />
        </div>
      </div>
      
    </div>
  );
}