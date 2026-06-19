import React from 'react'
import { Editor } from './editor';


interface PageProps {
  params : Promise<{ documentId: string }>
}


const page = async({params,}: PageProps) => {
  const temp = await params;
  const documentId = temp.documentId;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  )
}

export default page
