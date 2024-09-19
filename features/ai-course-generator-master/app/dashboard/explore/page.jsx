"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [courseList, setCourseList] = useState();
  const [pageIndex,setPageIndex] = useState(0)
  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);
  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList).limit(9).offset(pageIndex*9);
    setCourseList(result);
  };
  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Courses</h2>
      <p>Explore more courses build with AI by other users</p>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {courseList?.map((course, index) => (
          <div>
            <CourseCard course={course} displayUser={true}/>
          </div>
        ))}
      </div>
      <div className="flex justify-between ">

     
      {pageIndex !== 0 &&<Button onClick={()=>setPageIndex(pageIndex-1)}>Previous Page</Button>}
      <Button onClick={()=>setPageIndex(pageIndex+1)}>Next Page</Button>
      </div>
    </div>
  );
}

export default Explore;
