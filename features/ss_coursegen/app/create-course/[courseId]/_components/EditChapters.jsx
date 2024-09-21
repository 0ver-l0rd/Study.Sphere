import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/configs/db"
import { CourseList } from "@/configs/Schema"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import { HiPencilSquare } from "react-icons/hi2"
  
function EditChapters({course,index,refreshData}) {
    const Chapters = course?.courseOutput?.course?.chapters
    const [name,setName] = useState()
    const [about,setAbout] = useState()

    useEffect(() => {
        if (course && course.courseOutput && course.courseOutput.course) {
          setName(Chapters[index].name);
          setAbout(Chapters[index].about);
        }
      }, [course]);
    const onUpdateHandler = async()=>{
        course.courseOutput.course.chapters[index].name = name
        course.courseOutput.course.chapters[index].about = about

        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id,course?.id))
        .returning({
            id:CourseList.id
        })
        
      refreshData(true)
        
    }
  return (
    <Dialog>
    <DialogTrigger><HiPencilSquare/></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Chapter</DialogTitle>
        <DialogDescription>
        <div className='mt-344'>
            <label>Course Title</label>
            <Input defaultValue={Chapters[index].name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <Textarea className="h-40" defaultValue={Chapters[index].about}onChange={(e)=>setAbout(e.target.value)}/>
        </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
        </DialogClose>
    </DialogFooter>
    </DialogContent>
  </Dialog>
  
  )
}

export default EditChapters
