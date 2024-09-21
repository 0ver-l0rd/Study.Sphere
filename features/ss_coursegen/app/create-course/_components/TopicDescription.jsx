import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext)
  const handleInputChange = (fieldName,value)=>{
    setUserCourseInput(prev=>({...prev,[fieldName]:value}))
  }
  return (
    <div className="md:mx-20 sm:mx-5 lg:mx-44">
      <div className="mt-5">
        <label>
         💡 Write the topic for which you want to generate the course (e.g.,
          Python Course, Yoga, etc.):
        </label>
        <Input placeholder={"Topic"} onChange={(e)=>handleInputChange('topic',e.target.value)} defaultValue={userCourseInput?.topic} className="h-14 text-lg"/>
      </div>
      <div className="mt-5">
        <label>
         📝 Tell us more about your course, what you want to include in the course (Optional).
        </label>
        <Textarea placeholder="About your course" onChange={(e)=>handleInputChange('description',e.target.value)} defaultValue={userCourseInput?.description} className="h-14 text-lg"/>
      </div>
    </div>
  );
}

export default TopicDescription;
