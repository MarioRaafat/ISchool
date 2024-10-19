import {useAppstore} from "../../../../store/index.js";
import StudentHeader from "@/components/home/student/studentHeader.jsx";

const MainContainerStudent = () => {
    const { userInfo } = useAppstore();
    const examResults = [9 , 8, 7, 6, 10, 8, 9, 7, 10];
    const averageGrade = 82.2;
    const rank = 3;
    const upcomingExams = [
        {
            name: "Math",
            date: "22/10/2024",
            time: "9:00 AM"
        },
        {
            name: "Physics",
            date: "25/10/2024",
            time: "10:30 AM"
        },
        {
            name: "Science",
            date: "28/10/2024",
            time: "1:00 PM"

        }];
    const nextCourses = [
        {
            name: "Physics",
            time: "9:00 AM"
        },
        {
            name: "Science",
            time: "10:30 AM"
        },
        {
            name: "Math",
            time: "1:00 PM"
        }];

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
                <div className="grid grid-cols-3 gap-4">
                    {upcomingExams.map((exam, index) => (
                        <div key={index} className={`${index % 2 ? "bg-[#decef2]" : "bg-purple-800"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${index % 2 ? "text-gray-800" : "text-white"} font-bold text-2xl`}>{exam.name}</p>
                            <p className={`${index % 2 ? "text-gray-600" : "text-neutral-300"} text-sm`}>{exam.date}</p>
                            <p className={`${index % 2 ? "text-gray-600" : "text-neutral-300"} text-sm`}>{exam.time}</p>
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
                            <p className={`${!(index%2)? "text-gray-800" : "text-white"} font-bold text-2xl`}>{course.name}</p>
                            <p className={`${!(index%2)? "text-gray-600" : "text-neutral-300"} text-sm`}>{course.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContainerStudent;