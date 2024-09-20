"use client"
import Logo from '/app/_components/Logo'
import { Button } from '/components/ui/button'
import { db } from '/config/firebaseConfig'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from '/components/ui/progress'
import { toast } from 'sonner'
import NotifiationBox from './NotifiationBox'
import { cn } from "/lib/utils";

const MAX_FILE=process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

function SideNav({params}) {

    const [documentList,setDocumentList]=useState([]);
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        params&&GetDocumentList();
    },[params])

    /**
     * Used to get Document List
     */
    const GetDocumentList=()=>{
        const q=query(collection(db,'workspaceDocuments'),
    where('workspaceId','==',Number(params?.workspaceid)));
    const unsubscribe=onSnapshot(q,(querySnapshot)=>{
        setDocumentList([]);

        querySnapshot.forEach((doc)=>{
            setDocumentList(documentList=>[...documentList,doc.data()])
        })
    })

    }


    /**
     * Create New Document
     */
    const CreateNewDocument=async()=>{

        if(documentList?.length>=MAX_FILE)
        {
            toast("Upgrade to add new file",{
                description: "You reach max file, Please upgrad for unlimited file creation",
                action: {
                  label: "Upgrade",
                  onClick: () => console.log("Undo"),
                },
              })
            return;
        }

        setLoading(true);
        const docId=uuid4();
        await setDoc(doc(db,'workspaceDocuments',docId.toString()),{
            workspaceId:Number(params?.workspaceid),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            coverImage:null,
            emoji:null,
            id:docId,
            documentName:'Untitled Document',
            documentOutput:[]
        })

        await setDoc(doc(db,'documentOutput',docId.toString()),{
            docId:docId,
            output:[]
        })

        setLoading(false);
        router.replace('/workspace/'+params?.workspaceid+"/"+docId);
    }

  return (
    <div
    className={cn(
      "h-screen md:w-72 hidden md:block fixed p-5 shadow-md",
      "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
     
    )}
    style={{
      backdropFilter: "blur(16px) saturate(180%)",
      backgroundColor: "rgba(17, 25, 40, 0.75)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.125)",
    }}
  >
        <div className='flex justify-between items-center'>
            <Logo/>
            <NotifiationBox>
            <Bell className='h-5 w-5 text-gray-500'/>

            </NotifiationBox>
        </div>
        <hr className='my-5'></hr>
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium'>Workspace Name</h2>
                <Button size="sm" className="text-lg" onClick={CreateNewDocument}>
                    {loading?<Loader2Icon className='h-4 w-4 animate-spin' />:'+'}
                    </Button>
            </div>
        </div>

        {/* Document List  */}
        <DocumentList documentList={documentList}
        params={params} />

        {/* Progress Bar  */}

    </div>
  )
}

export default SideNav