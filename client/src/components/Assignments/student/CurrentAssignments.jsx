import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { apiClient } from "@/lib/apiClient.js";
import { CURRENT_ASSIGNMENTS } from "@/utils/constants.js";
import { useAppstore } from "../../../../store/index.js";

const CurrentAssignments = () => {
  const { userInfo } = useAppstore();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchCurrentAssignments = async () => {
      try {
        const response = await apiClient.post(CURRENT_ASSIGNMENTS, { classId: userInfo.classId });
        if (response.status === 200 && response.data) {
          setAssignments(response.data);
        } else {
          console.error('Error fetching last assignments:', response);
        }
      } catch (error) {
        console.error('Error fetching last assignments:', error);
      }
    };

    if (userInfo) {
      fetchCurrentAssignments();
    }
  }, [userInfo]);

  return (
      <div className="flex justify-center items-center p-4">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {assignments.map((assignment, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex items-center justify-between p-6">
                        <div>
                          <p className="text-xl md:text-2xl font-semibold">{assignment.name}</p>
                          <p className="text-sm md:text-base text-gray-500">Teacher: {assignment.teacherName}</p>
                          <p className="text-sm md:text-base text-gray-500">Date: {assignment.date}</p>
                          <p className="text-sm md:text-base text-gray-500">Time: {`${assignment.startTime} - ${assignment.endTime}`}</p>
                          {/*<p className="text-sm md:text-base text-gray-500">Avg Grade: {assignment.avgGrade}</p>*/}
                          {/*<p className="text-sm md:text-base text-gray-500">Rank: {assignment.rank}</p>*/}
                        </div>
                        <div className="w-14 h-14">
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

export default CurrentAssignments;