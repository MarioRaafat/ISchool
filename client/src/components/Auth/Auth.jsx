import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/apiClient.js";
import { LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import {useAppstore} from "../../../store/index.js";

const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("student");
    const { setUserInfo, userInfo } = useAppstore();
    const { toast } = useToast();

    const validateLogin = () => {
        if (!email.trim() || !password) {
            toast({ title: "Please fill all fields" });
            return false;
        } else if (!email.includes("@") || !email.includes(".")) {
            toast({ title: "Invalid email" });
            return false;
        } else if (password.length < 6) {
            toast({ title: "Password must be at least 6 characters" });
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (validateLogin()) {
            try {
                const response = await apiClient.post(`${LOGIN_ROUTE}`, { email, password, user }, { withCredentials: true });
                if (response.status === 200) {
                    toast({ title: "Logged In successfully" });
                    const userData = response.data.user;
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    userData.type = user;
                    setUserInfo(userData);
                    navigate("/home");
                } else {
                    toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There was a problem with your request." });
                }
            } catch (error) {
                if (error.response) {
                    const { message } = error.response.data;
                    if (message === "User not found") {
                        toast({ variant: "destructive", title: "User not found!!", description: "Please check your email" });
                    } else if (message === "Invalid password") {
                        toast({ variant: "destructive", title: "Incorrect password" });
                    } else {
                        toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
                    }
                }
            }
        }
    };

    return (
        <div className="auth-page h-screen w-screen flex items-center justify-center bg-gray-100 relative">
            {/* Background Circles */}
            <div className="absolute w-[300px] h-[300px] bg-[#d7c0ff] rounded-full top-[10%] left-[5%] z-0 opacity-70"></div>
            <div className="absolute w-[400px] h-[400px] bg-[#a895ff] rounded-full top-[20%] right-[10%] z-0 opacity-50"></div>
            <div className="absolute w-[200px] h-[200px] bg-[#f3d1ff] rounded-full bottom-[15%] left-[20%] z-0 opacity-60"></div>

            {/* Auth Card */}
            <div className="auth-card relative w-[90%] sm:w-[60%] md:w-[40%] h-auto p-10 bg-gradient-to-b from-[#eceaff] to-[#e0d3f7] flex flex-col items-center justify-center rounded-2xl shadow-lg z-10"
                 style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="auth-card-label flex justify-center w-full mt-4">
                    <p className="text-5xl font-bold text-[#6c13d7]">ISchool</p>
                </div>
                <p className="w-[75%] text-center text-gray-600 mt-2 mb-6">Get started with ISchool!</p>
                <Tabs defaultValue="student" className="w-full flex flex-col items-center">
                    <TabsList className="flex justify-between w-full mb-4">
                        <TabsTrigger value="student" onClick={() => setUser("student")}
                                     className="border-b-2 w-full data-[state=active]:bg-transparent data-[state=active]:font-semibold
                                 data-[state=active]:border-b-violet-700 transition-all duration-300 ease-in-out text-lg text-gray-600 hover:text-violet-700">
                            Student
                        </TabsTrigger>

                        <TabsTrigger value="teacher" onClick={() => setUser("teacher")}
                                     className="border-b-2 w-full data-[state=active]:bg-transparent data-[state=active]:font-semibold
                                 data-[state=active]:border-b-violet-700 transition-all duration-300 ease-in-out text-lg text-gray-600 hover:text-violet-700">
                            Teacher
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="student" className="w-full flex flex-col gap-5">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
                            <Input type="email" placeholder="Enter your school email" className="rounded-full p-4" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
                            <Input type="password" placeholder="Create a strong password" className="rounded-full p-4" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </TabsContent>

                    <TabsContent value="teacher" className="w-full flex flex-col gap-5">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
                            <Input type="email" placeholder="Enter your school email" className="rounded-full p-4" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
                            <Input type="password" placeholder="Create a strong password" className="rounded-full p-4" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </TabsContent>

                    <Button className="w-full mt-6 py-4 rounded-full bg-[#6c13d7] text-white transition-all duration-300 hover:text-fuchsia-600" onClick={handleLogin}>Log In</Button>
                </Tabs>
            </div>
        </div>
    );
};

export default Auth;
