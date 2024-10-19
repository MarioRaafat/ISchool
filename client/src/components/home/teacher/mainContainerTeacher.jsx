import {useAppstore} from "../../../../store/index.js";
import TeacherHeader from "@/components/home/teacher/teacherHeader.jsx";

const MainContainerTeacher = () => {
    const { userInfo } = useAppstore();
    const studentPerformance = 85.6;
    const teachingYears = 10;
    const lessonsTaught = 9;
    const upcomingClasses = [
        {
            class: "2/2",
            date: "22/10/2024",
            time: "9:00 AM"
        },
        {
            class: "3/1",
            date: "23/10/2024",
            time: "11:00 AM"
        },
        {
            class: "3/2",
            date: "24/10/2024",
            time: "10:30 AM"
        }];
    const averageScoreUpcomingClasses = [
        {
            class: "2/2",
            score: 85,
        },
        {
            class: "3/1",
            score: 90,
        },
        {
            class: "3/2",
            score: 80,
        }];

    return (
        <div className="bg-gray-100 mx-auto w-full p-2">
            <TeacherHeader />
            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Teaching Progress</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#decef2] p-4 rounded-3xl shadow-md flex flex-col items-center
                            transition-all hover:scale-105 hover:translate-y-1.5 shadow-l">
                        <p className="text-2xl font-bold text-gray-800">{studentPerformance}%</p>
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
                        <div key={index} className={`${index%2? "bg-[#decef2]" : "bg-purple-800"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${index%2? "text-gray-800" : "text-white"} font-bold text-2xl`}>{upcomingClass.class}</p>
                            <p className={`${index%2? "text-gray-600" : "text-neutral-300"} text-sm`}>{upcomingClass.date}</p>
                            <p className={`${index%2? "text-gray-600" : "text-neutral-300"} text-sm`}>{upcomingClass.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="m-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Average each class</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {averageScoreUpcomingClasses.map((subject, index) => (
                        <div key={index} className={`${index%2? "bg-purple-800" : "bg-[#decef2]"} p-4 rounded-3xl shadow-md flex flex-col items-center
                                transition-all hover:scale-105 hover:translate-y-1.5 shadow-l`}>
                            <p className={`${!(index%2)? "text-gray-800" : "text-white"} font-bold text-2xl`}>{subject.score}%</p>
                            <p className={`${!(index%2)? "text-gray-600" : "text-neutral-300"} text-sm`}>{subject.class}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContainerTeacher;
