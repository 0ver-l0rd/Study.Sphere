'use client'
import React, { useState } from "react";

import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

function DashboardLayout({ children }) {
  const [userCourseList,setUserCourseList] = useState([])
  const [showSideBar,setShowSideBar] = useState(false)
  const [showArrow,setShowArrow] = useState(true)
  const setState = ()=>{
    setShowSideBar(!showSideBar)
    setShowArrow(!showArrow)
  }
  return (
    <UserCourseListContext.Provider value={{userCourseList,setUserCourseList}}>
    <div>
 {  showArrow && <HiOutlineArrowRight className="text-2xl m-5 text-primary hover:translate-x-1 transition-all cursor-pointer md:hidden" onClick={setState}/>}

      <div className={`md:w-64 relative ${showSideBar ? 'w-70' : 'hidden'} md:block`}>
     <HiOutlineArrowLeft className=" text-2xl m-5 text-primary cursor-pointer md:hidden" onClick={setState}/> 
        <SideBar setState={setState}/>
      </div>
      <div className="md:ml-64">
        <Header/>
        <div className="p-10">
        {children}
        </div>
        </div>
    </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
