import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className=" flex items-center justify-between flex-row p-8 text-5xl">
      {children}
    </div>
  );
};