import { useAppstore } from "../../../store/index.js";
import StudentsAssignments from "./student/StudentAssignments.jsx";
import TeacherAssignments from "./teacher/TeacherAssignments.jsx";
import SideBarStudent from "../SideBar/sideBarStudent.jsx";
import SideBarTeacher from "../SideBar/sideBarTeacher.jsx";

const Exam = () => {
    const { userInfo } = useAppstore();

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {userInfo && (
                userInfo.type === "student" ? (
                    <div className="flex h-full w-full">
                        <SideBarStudent />
                        <div className="flex-1 overflow-y-auto">
                            <StudentsAssignments />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full w-full">
                        <SideBarTeacher />
                        <div className="flex-1 overflow-y-auto">
                            <TeacherAssignments />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Exam;
