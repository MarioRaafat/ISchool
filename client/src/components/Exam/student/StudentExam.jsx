import React from 'react';
import CurrentExams from './CurrentExams';
import UpcomingExams from './UpcomingExams';
import ProgressCircle from './ProgressCircle';

const StudentExam = () => {
  return (
    <div className="flex-1 w-full p-8 bg-gray-100 min-h-screen overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Good morning, iSchooler</h2>
        <p className="text-gray-600">Stay organized and productive with iSchool. Keep track of your progress and growth in knowledge.</p>
      </header>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCircle progress={70} className="rounded-full" />
        <ProgressCircle progress={95} className="rounded-full" />
        <ProgressCircle progress={40} className="rounded-full" />
      </section>

      {/* Current Exams Section */}
      <h2 className="text-3xl font-semibold text-gray-800 my-10">Current Exams</h2>
      <CurrentExams />

      {/* Upcoming Exams Section */}
      <h2 className="text-3xl font-semibold text-gray-800 my-10">Upcoming Exams</h2>
      <UpcomingExams />
    </div>
  );
};

export default StudentExam;
