import React from 'react'
import { Editor } from './editor';
import Toolbar from './toolbar';


interface PageProps {
  params : Promise<{ documentId: string }>
}


const page = async({params,}: PageProps) => {
  const temp = await params;
  const documentId = temp.documentId;
  console.log(documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  )
}

export default page
