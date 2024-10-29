import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ progress }) => {
  return (
	  <div className="col-span-1 bg-white shadow-lg rounded-full p-6 flex flex-col items-center ">
		<div className="w-24 h-24 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105 hover:translate-y-1.5 shadow-l cursor-pointer">
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathColor: '#6a0dad',
          textColor: '#6a0dad',
        })}
			  />
		</div>
      <p className="text-gray-600 mt-4">Your progress for this semester</p>
    </div>
  );
};

export default ProgressCircle;
