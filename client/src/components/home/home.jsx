import {useAppstore} from "../../../store/index.js";
import MainContainerTeacher from "@/components/home/teacher/mainContainerTeacher.jsx";
import MainContainerStudent from "@/components/home/student/mainContainerStudent.jsx";
import SideBarTeacher from "@/components/SideBar/sideBarTeacher.jsx";
import SideBarStudent from "@/components/SideBar/sideBarStudent.jsx";


const Home = () => {
    const { userInfo } = useAppstore();
    return (
        <div>
            {
                userInfo &&  (
                    userInfo.type === "student" ?
                        (
                            <div className="flex h-screen w-screen overflow-x-hidden">
                                <SideBarStudent />
                                <MainContainerStudent />
                            </div>
                        )
                    :
                        (
                            <div className="flex h-screen w-screen overflow-x-hidden">
                                <SideBarTeacher />
                                <MainContainerTeacher />
                            </div>
                        )
                )
            }
        </div>
    )
}

export default Home