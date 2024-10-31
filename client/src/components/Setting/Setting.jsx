import React from 'react';
import { useAppstore } from "../../../store/index.js";
import SideBarStudent from "../SideBar/sideBarStudent.jsx";
import SideBarTeacher from "../SideBar/sideBarTeacher.jsx";
import StudentSettings from "./student/StudentSettings.jsx";
import TeacherSettings from "./teacher/TeacherSettings.jsx";

const Setting = () => {
    const { userInfo, setUserInfo } = useAppstore();

    const SettingComponent = () => {
        return (
            <div className="w-full bg-white h-16 flex items-center justify-between px-4 shadow-md">
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>
        );
    };

    return (
        <div>
            {userInfo && (
                userInfo.type === "student" ? (
                    <div className="flex h-screen w-screen overflow-x-hidden">
                        <SideBarStudent />
                        <div className="flex-1 overflow-y-auto p-6">
                            <SettingComponent />
                            <StudentSettings userInfo={userInfo} setUserInfo={setUserInfo} />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-screen w-screen overflow-x-hidden">
                        <SideBarTeacher />
                        <div className="flex-1 overflow-y-auto p-6">
                            <SettingComponent />
                            <TeacherSettings userInfo={userInfo} setUserInfo={setUserInfo} />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Setting;