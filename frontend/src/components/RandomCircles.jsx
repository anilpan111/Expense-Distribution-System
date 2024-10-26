import React from "react";

const RandomCircles = () => {
  const circles = [
    { text: "Circle 1: A short description goes here.", x: "10%", y: "20%" },
    { text: "Circle 2: Another description here.", x: "50%", y: "30%" },
    { text: "Circle 3: Yet another text goes here.", x: "70%", y: "60%" },
    { text: "Circle 4: More information here.", x: "30%", y: "70%" },
  ];

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute bg-blue-500 text-white flex items-center justify-center rounded-full w-32 h-32 p-4 text-center"
          style={{ top: circle.y, left: circle.x }}
        >
          <p>{circle.text}</p>
        </div>
      ))}
    </div>
  );
};

export default RandomCircles;
