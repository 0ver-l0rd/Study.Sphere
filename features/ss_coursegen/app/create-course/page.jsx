"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading,setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const {user} = useUser()
  const router = useRouter()
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length === 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChepter == undefined)
    ) {
      return true;
    }
    return false;
  };
  const GenerateCourseLayout = async() => {
    setLoading(true)
    const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: '
    const USER_INPUT_PROMPT='Category: '+userCourseInput?.category+', Topic: '+userCourseInput?.topic+', Level:'+userCourseInput?.level+', Duration:'+userCourseInput?.duration+',NoOf Chapters:'+userCourseInput?.noOfChepter+', in JSON format'
    const FINAL_PROMPT=BASIC_PROMPT+USER_INPUT_PROMPT
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT)
    console.log(result.response?.text())
    console.log(JSON.parse(result.response?.text()));
    setLoading(false)
    saveCourseLayoutInDB(JSON.parse(result.response?.text()))
    
  };

  const saveCourseLayoutInDB= async(courseLayout)=>{
    var id = uuid4()
    setLoading(true)
    const result = await db.insert(CourseList).values({
      courseId:id,
      name: userCourseInput?.topic,
      level:userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput:courseLayout,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      username:user?.fullName,
      userProfileImage: user?.imageUrl,

    })
    console.log("finish");
    
  router.replace('/create-course/'+id)
    
    setLoading(false)
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center" key={index}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white bg-purple-500 ${
                    activeIndex >= index && "bg-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index !== StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-purple-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}

        <div className="flex justify-between mt-10 gap-5">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              onClick={() => GenerateCourseLayout()}
              disabled={checkStatus()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  );
}

export default CreateCourse;
