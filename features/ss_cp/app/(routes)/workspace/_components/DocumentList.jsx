import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '/config/firebaseConfig';
import { toast } from 'sonner';

function DocumentList({documentList,params}) {
    const router=useRouter();

    const DeleteDocument=async(docId)=>{
      await deleteDoc(doc(db, "workspaceDocuments", docId));
      toast('Document Deleted !')
    }

  return (
    <div>
        {documentList.map((doc,index)=>(
            <div key={index} 
            onClick={()=>router.push('/workspace/'+params?.workspaceid+"/"+doc?.id)}
            className={`mt-3 p-2 px-3 hover:bg-gray-600
            rounded-lg cursor-pointer flex justify-between items-center text-primary
            ${doc?.id==params?.documentid&&'bg-transparent'}
            `}>
                <div className='flex gap-2 items-center'>
                  {!doc.emoji&&  <Image src={'/loopdocument.svg'} width={20} height={20}/>}
                    <h2 className='flex gap-2'> {doc?.emoji} {doc.documentName}</h2>
                </div>
                <DocumentOptions doc={doc} deleteDocument={(docId)=>DeleteDocument(docId)} />
            </div>
        ))}
    </div>
  )
}

export default DocumentList