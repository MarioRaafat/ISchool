import React, { useState } from 'react';
import { Card as AntCard, Avatar } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { apiClient } from "@/lib/apiClient.js";
import { STUDENTS_IN_CLASS } from "@/utils/constants.js";

const ClassCard = ({ classData, loading }) => {
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await apiClient.post(STUDENTS_IN_CLASS, { classId: classData.id });
      if (response.status === 200) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEllipsisClick = () => {
    setShowStudents(!showStudents);
    if (!showStudents) {
      fetchStudents();
    }
  };

  return (
    <AntCard
      loading={loading}
      actions={[<EllipsisOutlined key="ellipsis" onClick={handleEllipsisClick} />]}
      style={{
        minWidth: 300,
      }}
    >
      <AntCard.Meta
        avatar={<Avatar src={classData.avatar} />}
        title={classData.name}
        description={
          <>
            <p>Grade Level: {classData.gradeLevel}</p>
            {showStudents && (
              <ul>
                {students.map(student => (
                  <li key={student.id}>{student.name} - {student.email}</li>
                ))}
              </ul>
            )}
          </>
        }
      />
    </AntCard>
  );
};

export default ClassCard;