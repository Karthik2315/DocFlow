import { TableCell,TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import {SiGoogledocs} from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { format } from "date-fns"
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
  document : Doc<"documents"> ;
};

export const DocumentRow = ({document}:DocumentRowProps) => {
  const router = useRouter();
  const onNewTabClick = (id:string) => {
    window.open(`/documents/${id}`,"_blank");
  }
  const onRowClick = (id:string) => {
    router.push(`/documents/${id}`);
  }
  return (
    <TableRow className="cursor-pointer border-none" onClick={() => onRowClick(document._id)}>
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500"/>
      </TableCell>
      <TableCell className="font-medium md:w-[45%] text-slate-400">
        {document.title}
      </TableCell>
      <TableCell className="hidden md:flex items-center pt-4 gap-2 text-slate-400">
        {document.organizationId ? <Building2Icon className="size-4"/> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-slate-400">
        {format(new Date(document._creationTime),"MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end ml-auto" onClick={(e) => e.stopPropagation()}>
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={onNewTabClick} />
      </TableCell>
    </TableRow>
  )
}