import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { apiClient } from "@/lib/apiClient.js";
import { LAST_EXAMS } from "@/utils/constants.js";
import { useAppstore } from "../../../../store/index.js";
import { ProgressCircleOnly } from './ProgressCircle.jsx';

const dummyExams = [
	{
		name: "Mathematics",
		teacherName: "Mr. John Doe",
		avgGrade: 90,
		rank: 1
	},
	{
		name: "Science",
		teacherName: "Mrs. Jane Doe",
		avgGrade: 85,
		rank: 2
	},
	{
		name: "History",
		teacherName: "Mr. John Doe",
		avgGrade: 80,
		rank: 3
	},
	{
		name: "Geography",
		teacherName: "Mrs. Jane Doe",
		avgGrade: 75,
		rank: 4
	},
	{
		name: "English",
		teacherName: "Mr. John Doe",
		avgGrade: 70,
		rank: 5
	},
];

const LastExams = () => {
  const { userInfo } = useAppstore();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchLastExams = async () => {
      try {
        const response = await apiClient.post(LAST_EXAMS, { classId: userInfo.classId, studentId: userInfo.id });
        if (response.status === 200 && response.data) {
          setExams(response.data);
        } else {
          console.error('Error fetching last exams:', response);
        }
      } catch (error) {
        console.error('Error fetching last exams:', error);
      }
    };

    if (userInfo) {
      fetchLastExams();
	  }
  }, [userInfo]);

  return (
    <div className="flex justify-center items-center p-4">
      <Carousel className="w-full max-w-2xl">
        <CarouselContent>
          {exams.map((exam, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <Card>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
						<p className="text-xl md:text-2xl font-semibold">{exam.name}</p>
						<p className="text-sm md:text-base text-gray-500">Teacher: {exam.teacherName}</p>
						<p className="text-sm md:text-base text-gray-500">Date: {exam.date}</p>
						<p className="text-sm md:text-base text-gray-500">Time: {`${exam.startTime} - ${exam.endTime}`}</p>
						{/*<p className="text-sm md:text-base text-gray-500">Avg Grade: {exam.avgGrade}</p>*/}
						{/*<p className="text-sm md:text-base text-gray-500">Rank: {exam.rank}</p>*/}
                    </div>
                    <div className="w-14 h-14">
                      <ProgressCircleOnly progress={((exam.grade / exam.maxGrade) * 100).toFixed(1)} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default LastExams;