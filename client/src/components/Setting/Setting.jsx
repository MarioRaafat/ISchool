import React from 'react';
import {useAppstore} from "../../../store/index.js";
import SideBarStudent from "../SideBar/SideBarStudent.jsx";
import SideBarTeacher from "../SideBar/SideBarTeacher.jsx";


const Setting = () => {

    const {userInfo, setUserInfo} = useAppstore();

    const SettingComponent = () => {
        // Example handler to update user information
        const handleChange = (field, value) => {
            setUserInfo({ ...userInfo, [field]: value });
        };

        return <>
                <div className="w-5/6 bg-white h-16 flex items-center justify-between px-4">
                    <h1 className="text-2xl font-bold">Setting</h1>
                </div>
            </>
    };



    return (
        <div>
            {userInfo && (
                userInfo.type === "student" ? (
                    <div className="flex h-screen w-screen overflow-x-hidden">
                        <SideBarStudent />
                        <SettingComponent />
                    </div>
                ) : (
                    <div className="flex h-screen w-screen overflow-x-hidden">
                        <SideBarTeacher />
                        <SettingComponent />
                    </div>
                )
            )}
        </div>
    );
}

export default Setting;
