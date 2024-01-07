import { useStepperContext } from "../../contexts/StepperContext";
import { useState, useEffect } from "react";

export default function GeneralInfo() {
  const { userData, setUserData } = useStepperContext();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate form data whenever userData changes
    setIsFormValid(userData.FirstName && userData.LastName && userData.area1 && userData.area2 && userData.area3);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          First Name
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["FirstName"] || ""}
            name="FirstName"
            placeholder="Johnny"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Last Name
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["LastName"] || ""}
            name="LastName"
            placeholder="Appleseed"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex flex-col">
        <div className="mt-3 text-xs font-bold uppercase text-gray-500">
            What are three general research areas that interest you? 
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["area1"] || ""}
            name="area1"
            placeholder="Artificial Intelligence"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["area2"] || ""}
            name="area2"
            placeholder="Physics"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["area3"] || ""}
            name="area3"
            placeholder="Political Science"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
    </div>
  );
}