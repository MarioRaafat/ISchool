import {useAppstore} from "../../../../store/index.js";
import StudentHeader from "@/components/home/student/studentHeader.jsx";
import {useEffect, useState} from "react";
import {apiClient} from "@/lib/apiClient.js";
import {CLASS_UPCOMING_COURSES, UPCOMING_EXAMS} from "@/utils/constants.js";

const MainContainerStudent = () => {
    const { userInfo } = useAppstore();
    const [nextExams, setNextExams] = useState([]);
    const [nextCourses, setNextCourses] = useState([]);
    const examResults = [9 , 8, 7, 6, 10, 8, 9, 7, 10];
    const averageGrade = 82.2;
    const rank = 3;

    useEffect(() => {
        const fetchUpcomingExams = async () => {
            const response = await apiClient.post(UPCOMING_EXAMS, {studentId: userInfo.id}, {withCredentials: true});
            if (response.status === 200) {
                setNextExams(response.data);
            }
        }
        if (userInfo.id) {
            fetchUpcomingExams();
        }
    }, [nextExams, userInfo]);


    useEffect(() => {
        const fetchUpcomingCourses = async () => {
            try {
                const response = await apiClient.post(CLASS_UPCOMING_COURSES, { classId: userInfo.classId});
                if (response.status === 200) {
                    setNextCourses(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (userInfo.classId) {
            fetchUpcomingCourses();
        }
    },[nextCourses, userInfo]);

    return (
        <div className="bg-gray-100 mx-auto w-full">
            <StudentHeader />
            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Progress</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#decef2] p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-gray-800">{examResults[0]}</p>
                        <p className="text-gray-600 text-sm">Last Exam Result</p>
                    </div>
                    <div className="bg-purple-800 p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-white">{averageGrade}%</p>
                        <p className="text-neutral-300 text-sm">Average Grade</p>
                    </div>
                    <div className="bg-[#decef2] p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-gray-800">{rank}</p>
                        <p className="text-gray-600 text-sm">Rank</p>
                    </div>
                </div>
            </div>

            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Exams & Assignments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {nextExams.map((exam, index) => (
                        <div key={index} className={`${index % 2 ? "bg-[#decef2]" : "bg-purple-800"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${index % 2 ? "text-gray-800" : "text-white"} font-bold md:text-2xl sm:text-lg`}>{exam.name}</p>
                            <p className={`${index % 2 ? "text-gray-600" : "text-neutral-300"} md:text-sm sm:text-xs`}>{exam.date}</p>
                            <p className={`${index % 2 ? "text-gray-600" : "text-neutral-300"} md:text-sm sm:text-xs`}>{`${exam.startTime} - ${exam.endTime}`}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {nextCourses.map((course, index) => (
                        <div key={index} className={`${index%2? "bg-purple-800" : "bg-[#decef2]"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${!(index%2)? "text-gray-800" : "text-white"} font-bold md:text-2xl sm:text-lg`}>{course.name}</p>
                            <p className={`${!(index%2)? "text-gray-600" : "text-neutral-300"} md:text-sm sm:text-xs`}>{course.day}</p>
                            <p className={`${!(index%2)? "text-gray-600" : "text-neutral-300"} md:text-sm sm:text-xs`}>{`${course.startTime} - ${course.endTime}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContainerStudent;