import { useAppstore } from "../../../store/index.js";
import { useState, useEffect } from "react";
import { FaHome, FaCalendarAlt, FaClipboardList, FaFileAlt, FaCog } from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import { LogOutIcon } from "lucide-react";
import { RiMenu2Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx"
import logoPath from "../../assets/logo.png";
import {useLocation, useNavigate} from 'react-router-dom';
import {toast} from "@/hooks/use-toast.js";

const SideBarTeacher = () => {
    const { userInfo } = useAppstore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { firstName, lastName, email, image} = userInfo;
    const URLPath = useLocation().pathname.split("/")[1];
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <>
            {isMobile && !isSidebarOpen && (
                <div className="fixed duration-300 transition-all ease-in-out p-3">
                    <RiMenu2Line
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                </div>
            )}
            <div
                className={` ${isMobile && isSidebarOpen ? "fixed  top-0 left-0 w-full h-full bg-opacity-60 backdrop-blur-lg z-50" : "relative"} h-screen flex flex-col gap-3 p-5 bg-[#d3d3d3] transition-all duration-300 ease-in-out ${!isMobile ? "w-[30vw] max-w-[250px]" : isSidebarOpen ? "w-[70%]" : "hidden"}`}>
                <div className={`title mb-5 flex justify-start items-center gap-1.5 cursor-pointer
                ${isMobile? "justify-center" : null}`}
                     onClick={
                         () => {
                             isMobile? setIsSidebarOpen(!isSidebarOpen) : null;
                         }
                     }>
                    <img src={logoPath} alt="ISchool Logo"
                         className="w-[30px] md:w-[40px] lg:w-[50px] h-[30px] md:h-[40px] lg:h-[50px]"/>
                    <p className="text-xl md:text-2xl lg:text-4xl font-bold">ISchool</p>
                </div>

                <div
                    className={`hover:bg-amber-50 cursor-pointer rounded-full border-2 border-hidden px-2 py-1 
                    flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                    onClick={
                        () => {
                            if(URLPath === "home") {
                                if (isMobile) setIsSidebarOpen(!isSidebarOpen);
                                return
                            }
                            navigate("/home");
                        }
                    }>
                    <FaHome/> Home
                </div>
                <div
                    className={`hover:bg-amber-50 cursor-pointer rounded-full border-2 border-hidden px-2 py-1 
                    flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                    onClick={
                        () => {
                            if(URLPath === "calendar") return;
                            navigate("/calendar");
                        }
                    }>
                    <FaCalendarAlt/> Calendar
                </div>
                <div
                    className={`hover:bg-amber-50 cursor-pointer rounded-full border-2 border-hidden px-2 py-1 
                    flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                    onClick={
                        () => {
                            if(URLPath === "classes") return;
                            navigate("/classes");
                        }
                    }>
                    <SiGoogleclassroom/> Classes
                </div>
                <div
                    className={`hover:bg-amber-50 cursor-pointer rounded-full border-2 border-hidden px-2 py-1 
                    flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                    onClick={
                        () => {
                            if(URLPath === "assignments") return;
                            navigate("/assignments");
                        }
                    }>
                    <FaClipboardList/> Assignments
                </div>
                <div
                    className={`hover:bg-amber-50 cursor-pointer rounded-full border-2 border-hidden px-2 py-1 
                    flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                    onClick={
                        () => {
                            if(URLPath === "exams") return;
                            navigate("/exams");
                        }
                    }>
                    <FaFileAlt/> Exams
                </div>

                <div className={`absolute ${isMobile? "bottom-2" : "bottom-8"} flex flex-col w-[85%] gap-3 ${isMobile && !isSidebarOpen? "hidden" : null}`}>
                    <div
                        className="flex justify-start pl-2 items-center gap-3 h-14 bg-amber-50 rounded-full w-full"
                        style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
                        <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                            {image ? (
                                <AvatarImage
                                    src={image}
                                    alt="profile image"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div
                                    className={`font-bold text-l uppercase h-10 w-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-300 border-black border-[1px]`}>
                                    {firstName[0]}
                                </div>
                            )}
                        </Avatar>

                        <div
                            className={`flex flex-col max-w-[60%] md:max-w-[50%] lg:max-w-[60%] ${isSidebarOpen ? "block" : "hidden"} md:block `}>
                            <p className="text-gray-900 text-sm  md:block truncate">
                                {firstName} {lastName}
                            </p>

                            <p className="text-gray-900 text-[10px] md:block truncate">
                                {email}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`hover:bg-amber-50 cursor-pointer rounded-full border-2 border-hidden px-2 py-1 
                        flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                        onClick={
                            () => {
                                if(URLPath === "setting") return;
                                navigate("/setting");
                            }
                        }>
                        <FaCog/> Settings
                    </div>
                    <div
                        className={`hover:bg-amber-50 hover:text-red-700 cursor-pointer rounded-full border-2 border-hidden
                        px-2 py-1 flex items-center gap-2 ${isMobile && !isSidebarOpen? "hidden" : null}`}
                        onClick={
                            () => {
                                if(URLPath === "logout") return;
                                navigate("/logout");
                            }
                        }>
                        <LogOutIcon/> Logout
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBarTeacher;

