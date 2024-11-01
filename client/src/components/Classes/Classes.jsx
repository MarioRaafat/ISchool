import React, { useState, useEffect } from 'react';
import SidebarTeacher from '../SideBar/sideBarTeacher.jsx';
import { apiClient } from "@/lib/apiClient.js";
import { TEACHER_CLASSES } from "@/utils/constants.js";
import { useAppstore } from "../../../store/index.js";
import ClassCard from "./Card.jsx";

const Classes = () => {
  const { userInfo } = useAppstore();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherClasses = async () => {
      try {
        const response = await apiClient.post(TEACHER_CLASSES, { teacherId: userInfo.id });
        if (response.status === 200) {
          setClasses(response.data);
        } else {
          console.error('Failed to fetch classes:', response);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchTeacherClasses();
    }
  }, [userInfo]);

  return (
    <div className="flex flex-row">
      <SidebarTeacher />
      <div className="flex-1 w-full p-8 bg-gray-100 min-h-screen overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Your Classes</h2>
          <p className="text-gray-600">Stay organized and productive with iSchool. Keep track of your classes and students.</p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((class_) => (
            <ClassCard key={class_.id} classData={class_} loading={loading} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Classes;