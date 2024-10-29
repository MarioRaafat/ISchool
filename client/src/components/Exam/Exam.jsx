import { useAppstore } from "../../../store/index.js";
import StudentExam from "@/components/Exam/student/StudentExam.jsx";
import TeacherExam from "@/components/Exam/teacher/TeacherExam.jsx";
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
              <StudentExam />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full">
            <SideBarTeacher />
            <div className="flex-1 overflow-y-auto">
              <TeacherExam />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Exam;
