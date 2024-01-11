import React, { useState } from 'react';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleDragStart = (event, value) => {
    event.dataTransfer.setData('text/plain', value.toString());
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const value = parseInt(event.dataTransfer.getData('text/plain'));
    setRating(value);
  };

  return (
    <div className="flex items-center">
      <div className="mr-2">Drag to rate:</div>
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={`rating-item ${value <= rating ? 'active' : ''}`}
          draggable="true"
          onDragStart={(event) => handleDragStart(event, value)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default Rating;