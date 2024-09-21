"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();
  useEffect(() => {
    params && GetCourse();
  }, [params, user]);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        ", Chapter:" +
        chapter?.name +
        ", in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable";

      try {
        let videoId = "";
        service.getVideos(course?.name + ":" + chapter?.name).then((res) => {
          console.log(res);
          videoId = res[0]?.id?.videoId;
        });
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const content = JSON.parse(result?.response?.text());
        console.log(result?.response?.text());

        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      await db.update(CourseList).set({
        publish: true,
      });
      router.replace("/create-course/" + course?.courseId + "/finish");
    });
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      {/* Basic info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* course detail */}
      <CourseDetail course={course} />
      {/* list of Lesson  */}
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Button className="my-10" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
