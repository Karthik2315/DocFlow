import {BsCloudCheck} from "react-icons/bs"

export const DocumentInput = ()=>{
  return (
    <div className="flex items-center gap-2">
      <span className="text-[15px] cursor-pointer px-1.5 truncate">Untitled Document</span>
      <BsCloudCheck />
    </div>
  )
}