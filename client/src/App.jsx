import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/components/Auth/Auth.jsx';
import Home from '@/components/home/home.jsx';
import Courses from '@/components/courses/coursesStudent.jsx';
import MyCalendar from '@/components/Calendar/Calendar.jsx';
import Exam from '@/components/Exam/Exam.jsx';
import Setting from '@/components/Setting/Setting.jsx';
import Assignment from '@/components/Assignments/Assignment.jsx';
import Classes from '@/components/Classes/Classes.jsx';
import { useAppstore } from '../store/index.js';
import { apiClient } from '@/lib/apiClient.js';
import { GET_USER_INFO } from '@/utils/constants.js';

function App() {
    const { userInfo, setUserInfo } = useAppstore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserInfo = async () => {
            const token = localStorage.getItem('token');
            console.log("Token:", token);
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });

                if (response.status === 200) {
                    setUserInfo(response.data.user);
                } else {
                    console.log("Error status:", response.status);
                    setUserInfo(undefined);
                }
            } catch (err) {
                console.error("Error fetching user info:", err.response ? err.response.data : err.message);
                setUserInfo(undefined);
            } finally {
                setLoading(false);
            }
        };

        if (!userInfo) {
            getUserInfo();
        } else {
            setLoading(false);
        }
    }, [userInfo, setUserInfo]);

    const PrivateRoute = ({ children }) => {
        const { userInfo } = useAppstore();
        const isAuthenticated = !!userInfo;
        return isAuthenticated ? children : <Navigate to="/auth" />;
    };

    const AuthRoute = ({ children }) => {
        const { userInfo } = useAppstore();
        const isAuthenticated = !!userInfo;
        return isAuthenticated ? <Navigate to="/home" /> : children;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={
                    <AuthRoute>
                        <Auth />
                    </AuthRoute>
                } />
                <Route path="/home" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/courses" element={
                    <PrivateRoute>
                        <Courses />
                    </PrivateRoute>
                } />
                <Route path="/calendar" element={
                    <PrivateRoute>
                        <MyCalendar />
                    </PrivateRoute>
                } />
                <Route path="/exams" element={
                    <PrivateRoute>
                        <Exam />
                    </PrivateRoute>
                } />
                <Route path="/assignments" element={
                    <PrivateRoute>
                        <Assignment />
                    </PrivateRoute>
                } />
                <Route path="/setting" element={
                    <PrivateRoute>
                        <Setting />
                    </PrivateRoute>
                } />

				<Route path="/classes" element={
					<PrivateRoute>
						<Classes />
					</PrivateRoute>
				} />
				
                <Route path="*" element={
                    <Navigate to="/auth" />
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;