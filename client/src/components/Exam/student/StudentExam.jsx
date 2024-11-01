import React from 'react';
import LastExams from './LastExams.jsx';
import UpcomingExams from './UpcomingExams';
import ProgressCircle from './ProgressCircle';
import { useState, useEffect } from 'react';
import {apiClient} from "@/lib/apiClient.js";
import {useAppstore} from "../../../../store/index.js";
import {EXAM_RESULTS_STUDENT} from "@/utils/constants.js";

const StudentExam = () => {

    const [results, setResults] = useState([]);
    const [lastExam, setLastExam] = useState(0);
    const {userInfo} = useAppstore();
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await apiClient.post(EXAM_RESULTS_STUDENT, {studentId: userInfo.id});
                if (response.status === 200) {
                    const data = response.data;
                    const totalGrades = data.reduce((acc, result) => acc + result.grade, 0);
                    const totalMaxGrade = data.reduce((acc, result) => acc + result.maxGrade, 0);
                    const average = (totalGrades / totalMaxGrade * 100).toFixed(1);

                    setLastExam((data[0].grade / data[0].maxGrade * 100).toFixed(1));
                    setAverage(average);
                    setResults(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (userInfo) {
            fetchResults();
        }
    }, [userInfo]);

  return (
    <div className="flex-1 w-full p-8 bg-gray-100 min-h-screen overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Good morning, iSchooler</h2>
        <p className="text-gray-600">Stay organized and productive with iSchool. Keep track of your progress and growth in knowledge.</p>
      </header>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressCircle progress={lastExam} description={"Last Exam Percentage"} className="rounded-full" />
        <ProgressCircle progress={average} description={"Average Exam Scores this Semester"} className="rounded-full" />
      </section>

      {/* Current Exams Section */}
      <h2 className="text-3xl font-semibold text-gray-800 my-10 ">Last Exams</h2>
      <LastExams />

      {/* Upcoming Exams Section */}
      <h2 className="text-3xl font-semibold text-gray-800 my-10">Upcoming Exams</h2>
      <UpcomingExams />
    </div>
  );
};

export default StudentExam;
