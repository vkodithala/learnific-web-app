import React from 'react';

const Dropdown = ({ options, onChange, name, value }) => {

  const handleOptionChange = (event) => {
    onChange({ target: { name, value: event.target.value } });
  };

  return (
    <div className="relative">
      <select
        id="dropdown"
        name={name}
        value={value}
        onChange={handleOptionChange}
        className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500"
      >
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
