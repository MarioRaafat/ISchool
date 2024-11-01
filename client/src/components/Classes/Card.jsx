import React, { useState } from 'react';
import { Card as AntCard, Avatar, Button } from 'antd';
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

  const handleMoreClick = () => {
    setShowStudents(!showStudents);
    if (!showStudents) {
      fetchStudents();
    }
  };

  return (
    <AntCard
      loading={loading}
      actions={[
        <Button key="more" type="link" onClick={handleMoreClick}>
          {showStudents ? 'Hide Students' : 'Show Students'}
        </Button>
      ]}
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        minWidth: 300,
      }}
      bodyStyle={{
        padding: '20px',
      }}
      hoverable
    >
      <AntCard.Meta
        avatar={<Avatar src={classData.avatar} />}
        title={<span className="text-lg font-semibold">{classData.name}</span>}
        description={
          <>
            <p className="text-gray-600">Grade Level: {classData.gradeLevel}</p>
            {showStudents && (
              <ul className="mt-2">
                {students.map(student => (
                  <li key={student.id} className="text-gray-500">{student.name} - {student.email}</li>
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