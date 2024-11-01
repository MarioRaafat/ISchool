import { useAppstore } from "../../../../store/index.js";
import TeacherHeader from "@/components/home/teacher/teacherHeader.jsx";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient.js";
import { TEACHER_AVERAGE_PERFORMANCE, TEACHER_INFO, TEACHER_UPCOMING_CLASSES, TEACHER_AVERAGE_SCORES } from "@/utils/constants.js";

const MainContainerTeacher = () => {
    const { userInfo } = useAppstore();
    const [studentPerformance, setStudentPerformance] = useState(0);
    const [teachingYears, setTeachingYears] = useState(0);
    const [lessonsTaught, setLessonsTaught] = useState(0);
    const [upcomingClasses, setUpcomingClasses] = useState([]);
    const [averageScoreUpcomingClasses, setAverageScoreUpcomingClasses] = useState([]);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                // Fetch average teacher performance
                const responsePerformance = await apiClient.post(TEACHER_AVERAGE_PERFORMANCE, { teacherId: userInfo.id });
                if (responsePerformance.status === 200) {
                    setStudentPerformance(responsePerformance.data.averagePerformance);
                }

                // Fetch teaching years and lessons taught
                const responseTeachingInfo = await apiClient.get(`${TEACHER_INFO}/${userInfo.id}/info`);
                if (responseTeachingInfo.status === 200) {
                    setTeachingYears(responseTeachingInfo.data.teachingYears);
                    setLessonsTaught(responseTeachingInfo.data.lessonsTaught);
                }

                // Fetch upcoming classes
                const responseClasses = await apiClient.post(TEACHER_UPCOMING_CLASSES, { teacherId: userInfo.id });
                if (responseClasses.status === 200) {
                    const flattenedClasses = responseClasses.data.upcomingClasses.flat().slice(0, 3);
                    setUpcomingClasses(flattenedClasses);
                }

                // Fetch average scores for each class
                const responseAverageScores = await apiClient.post(TEACHER_AVERAGE_SCORES, { teacherId: userInfo.id });
                if (responseAverageScores.status === 200) {
                    setAverageScoreUpcomingClasses(responseAverageScores.data.averageScores);
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        if (userInfo) {
            fetchTeacherData();
        }
    }, [userInfo]);

    return (
        <div className="bg-gray-100 mx-auto w-full p-2">
            <TeacherHeader />
            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Teaching Progress</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#decef2] p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-gray-800">{studentPerformance.toFixed(2)}%</p>
                        <p className="text-gray-600 text-sm">Average Student Performance</p>
                    </div>
                    <div className="bg-purple-800 p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-white">{teachingYears} Years</p>
                        <p className="text-neutral-300 text-sm">Experience</p>
                    </div>
                    <div className="bg-[#decef2] p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-gray-800"> {lessonsTaught}</p>
                        <p className="text-gray-600 text-sm">Lessons you taught</p>
                    </div>
                </div>
            </div>

            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Classes</h2>
                <div className="grid grid-cols-3 gap-4">
                    {upcomingClasses.map((upcomingClass, index) => (
                        <div key={index} className={`${index % 2 ? "bg-purple-800" : "bg-[#decef2]"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${!(index % 2) ? "text-gray-800" : "text-white"} font-bold text-2xl`}>{upcomingClass.class}</p>
                            <p className={`${!(index % 2) ? "text-gray-600" : "text-neutral-300"} text-sm`}>{upcomingClass.subject}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Average each class</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {averageScoreUpcomingClasses.map((subject, index) => (
                        <div key={index} className={`${index % 2 ? "bg-purple-800" : "bg-[#decef2]"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${!(index % 2) ? "text-gray-800" : "text-white"} font-bold text-2xl`}>{subject.score}%</p>
                            <p className={`${!(index % 2) ? "text-gray-600" : "text-neutral-300"} text-sm`}>{subject.class}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContainerTeacher;