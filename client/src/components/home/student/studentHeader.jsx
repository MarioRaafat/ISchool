import { useAppstore } from "../../../../store/index.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { useEffect, useState } from "react";
import {CLASS_INFO} from "@/utils/constants.js";
import {apiClient} from "@/lib/apiClient.js";

const StudentHeader = () => {
    const { userInfo } = useAppstore();
    const { image, firstName, lastName, email } = userInfo;
    const navigate = useNavigate();
    const [studentClass, setStudentClass] = useState("0");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const response = await apiClient.post(CLASS_INFO, {classId: userInfo.classId}, { withCredentials: true });
                if (response.status === 200) {
                    setStudentClass(response.data.name);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (userInfo.classId) {
            fetchClass();
        }
    }, [userInfo]);


    const handleClick = () => {
        navigate("/setting");
    }

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-auto w-full flex items-center justify-between space-x-4 sm:space-x-6 max-h-36">
            <div className="flex items-center space-x-4 sm:space-x-6">
                <Avatar className="h-16 w-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                    {image ? (
                        <AvatarImage
                            src={image}
                            alt="profile image"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div
                            className={`font-bold text-2xl lg:text-3xl uppercase h-16 w-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center bg-gray-800 text-gray-300 border-black border-[1px]`}>
                            {firstName[0]}
                        </div>
                    )}
                </Avatar>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{`${firstName} ${lastName}`}</h1>
                    {/*<p className="text-gray-600">@student_info</p>*/}
                    <div className={`text-gray-500 mt-1 flex ${isMobile ? "flex-col gap-1" : "gap-3"}`}>
                        <div>
                            <span className="font-semibold text-gray-700">Class: </span>
                            {studentClass}
                        </div>
                        {/*<div>*/}
                        {/*    <span className="font-semibold text-gray-700">Email: </span>*/}
                        {/*    {email}*/}
                        {/*</div>*/}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Email: </span>
                        <span className="text-gray-500">{email}</span>
                    </div>
                    {/*{!isMobile && (*/}
                    {/*    <p className="text-gray-500 mt-1">*/}
                    {/*        <span className="font-semibold text-gray-700">Subjects Taken: </span>*/}
                    {/*        {courses.join(", ")}*/}
                    {/*    </p>*/}
                    {/*)}*/}
                </div>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-full" onClick={handleClick}>
                View Profile
            </Button>
        </div>
    );
};

export default StudentHeader;
