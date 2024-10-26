import React from "react";

const RandomCircles = () => {
  const statements=["Pay Member B", "Refund Member A", "Collect from Member C","Collect from Member C","Collect from Member C","Collect from Member C","Collect from Member C lorem ksj shfng uygfuyn siduyfajh "]

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {statements.map((statement, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-500 text-white font-semibold text-center p-2 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
        >
          <p className="text-sm px-2">{statement}</p>
        </div>
      ))}
    </div>
  );
};

export default RandomCircles;
