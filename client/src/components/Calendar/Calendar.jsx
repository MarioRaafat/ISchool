import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarStyles.css";
import SideBarTeacher from "@/components/SideBar/sideBarTeacher.jsx";
import SideBarStudent from "@/components/SideBar/sideBarStudent.jsx";
import { useAppstore } from "../../../store/index.js";
import {apiClient} from "@/lib/apiClient.js";
import {COURSES_STUDENT_ROUTE} from "@/utils/constants.js";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const { userInfo } = useAppstore();
    const [initialEvents, setInitialEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const schoolStartDate = new Date("2024-10-01");
    const startDayIndex = schoolStartDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // dummy
    // const initialEvents = [
    //     {
    //         title: "Math",
    //         start: new Date(2024, 8, 27, 13, 0),
    //         end: new Date(2024, 8, 27, 14, 0),
    //         allDay: false,
    //     },
    //     {
    //         title: "Physics",
    //         start: new Date(2024, 8, 28, 10, 0),
    //         end: new Date(2024, 8, 28, 12, 0),
    //         allDay: false,
    //     },
    // ];

    // Function to generate weekly recurring events
    const generateWeeklyEvents = (title, startDate, endDate, weeks) => {
        const recurringEvents = [];
        for (let i = 0; i < weeks; i++) {
            const start = new Date(startDate);
            start.setDate(start.getDate() + i * 7);

            const end = new Date(endDate);
            end.setDate(end.getDate() + i * 7);

            recurringEvents.push({
                title,
                start,
                end,
                allDay: false,
                recurring: true,
            });
        }
        return recurringEvents;
    };

    useEffect(() => {
        const fetchingCourses = async () => {
            const response = await apiClient.post(COURSES_STUDENT_ROUTE, {classId: userInfo.classId},{withCredentials: true});
            if (response.status === 200 && response.data) {
                const courses = response.data;
                const events = courses.map((course) => {
                    const targetDayIndex = weekDays.indexOf(course.day);
                    const dayDifference = (targetDayIndex - startDayIndex + 7) % 7 || 7;
                    let courseStartDateBegin = new Date(schoolStartDate);
                    let courseStartDateEnd = new Date(schoolStartDate);
                    courseStartDateBegin.setDate(schoolStartDate.getDate() + dayDifference);
                    courseStartDateEnd.setDate(schoolStartDate.getDate() + dayDifference);
                    let [startHour, startMinute] = course.startTime.split(" ")[0].split(":");
                    let [endHour, endMinute] = course.endTime.split(" ")[0].split(":");
                    const startPeriod = course.startTime.split(" ")[1];
                    const endPeriod = course.endTime.split(" ")[1];
                    if (startPeriod === "PM" && startHour !== "12") {
                        startHour = String(Number(startHour) + 12);
                    }
                    if (endPeriod === "PM" && endHour !== "12") {
                        endHour = String(Number(endHour) + 12);
                    }
                    courseStartDateBegin.setHours(startHour, startMinute);
                    courseStartDateEnd.setHours(endHour, endMinute);
                    return {
                        title: course.name,
                        start: courseStartDateBegin,
                        end: courseStartDateEnd,
                        allDay: false,
                    };
                });
                setInitialEvents(events);
            }
        };
        if (userInfo) {
            fetchingCourses();
        }

    }, [userInfo]);


    useEffect(() => {
        const recurringEvents = initialEvents.flatMap((event) =>
            generateWeeklyEvents(event.title, event.start, event.end, 10)
        );
        setEvents(recurringEvents);
    }, [initialEvents]);

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: "#6e52b5",
            color: "white",
            borderRadius: "8px",
            padding: "5px",
            border: "none",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            fontSize: "14px",
            fontWeight: "500",
            textAlign: "center",
            overflow: "hidden",
        };
        return { style };
    };

    const minTime = new Date();
    minTime.setHours(8, 0, 0); // 8:00 AM

    const maxTime = new Date();
    maxTime.setHours(16, 0, 0); // 4:00 PM


    const CalendarHeader = ({ label, onNavigate, onView, view }) => {
        return (
            <div className="calendar-header flex flex-col px-4 py-2">
                <h2 className="text-3xl font-semibold pl-9 sm:pl-7 md:pl-4 lg:pl-0">{label}</h2>
                <div className="flex justify-between items-center px-4 py-2 w-full">
                    <div className="navigation-buttons flex space-x-2">
                        <button className={"text-[20px] font-bold"} onClick={() => onNavigate("PREV")}>&lt;</button>
                        <button className={"text-[20px] font-bold"} onClick={() => onNavigate("NEXT")}>&gt;</button>
                    </div>
                    <div className="view-buttons flex space-x-2">
                        <button
                            onClick={() => onView(Views.DAY)}
                            className={`px-3 py-1 rounded-full ${view === Views.DAY ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            Day
                        </button>
                        <button
                            onClick={() => onView(Views.WEEK)}
                            className={`px-3 py-1 rounded-full ${view === Views.WEEK ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => onView(Views.MONTH)}
                            className={`px-3 py-1 rounded-full ${view === Views.MONTH ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            Month
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const CalendarComponent = () => (
        <div className="h-full relative w-full">
            <Calendar
                localizer={localizer}
                events={events}
                defaultView={Views.WEEK}
                views={['week', 'day', 'month']}
                components={{
                    toolbar: CalendarHeader,
                }}
                min={minTime}
                max={maxTime}
                className="h-full w-full overflow-hidden"
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );

    useEffect(() => {
        const timeSlots = document.querySelectorAll('.rbc-time-gutter .rbc-time-slot');
        timeSlots.forEach((slot, index) => {
            if (index % 2 === 0) {
                slot.style.borderTop = '1px solid #e2e8f0';
            } else {
                slot.style.borderTop = 'none';
            }
            slot.style.color = '#b9a3e3';
            slot.style.fontSize = '12px';
            slot.style.margin = '8px';
            slot.style.paddingLeft = '5px';
            slot.style.paddingTop = '5px';
        });
    }, [events]);

    return (
        <div>
            {userInfo && (
                userInfo.type === "student" ? (
                    <div className="flex h-screen w-screen overflow-x-hidden">
                        <SideBarStudent />
                        <CalendarComponent/>
                    </div>
                ) : (
                    <div className="flex h-screen w-screen overflow-x-hidden">
                        <SideBarTeacher />
                        <CalendarComponent />
                    </div>
                )
            )}
        </div>
    );
};

export default MyCalendar;
