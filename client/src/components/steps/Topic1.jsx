import { useStepperContext } from "../../contexts/StepperContext";
import Rating from "../rating";
import Dropdown from "../Dropdown";
export default function Topic1() {
  const { userData, setUserData } = useStepperContext();
  const experticeOptions = ['1: No Clue', '2: Begginer', '3: Intermediate', '4: Advanced', '5: Expert'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          What specifically about [Area] interests you? ([SHOW EXAMPLES])
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
            onChange={handleChange}
            value={userData["topics"] || ""}
            name="topics"
            placeholder="NLP, LLM, Transformers, etc."
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Why does [Area] facinate you? The more specific the better!
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["why"] || ""}
            name="why"
            placeholder="I am new to the world of AI and I am facinated by ..."
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Rate your expertice in [Area] from 1-5
        </div>
        <div className="my-2">
        <Dropdown options={experticeOptions}/>
        </div>
      </div>
      
    </div>
  );
}