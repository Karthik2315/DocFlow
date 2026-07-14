"use client";
import { ExternalLinkIcon, MoreVertical, Pen, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";
import { useEffect, useState } from "react";


interface DocumentMenuProps {
  documentId: Id<"documents">;
  title:string;
  onNewTab: (id:Id<"documents">) => void;
}

export const DocumentMenu = ({documentId,title,onNewTab}:DocumentMenuProps) => {
  const [renameOpen,setIsRenameOPen] = useState(false);
  useEffect(() => {
    if(!renameOpen)
    {
      document.body.style.pointerEvents = "auto";
    }
  },[renameOpen]); 
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <MoreVertical className="size-4 text-slate-400"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onNewTab(documentId)} className="cursor-pointer bg-white">
            <ExternalLinkIcon className="size-4" />
            Open in a New tab
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {
            setIsRenameOPen(true)
          }} className="cursor-pointer">
            <Pen className="size-4" />
            Rename
          </DropdownMenuItem>
          <RemoveDialog documentId={documentId} >
            <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()} className="cursor-pointer">
              <TrashIcon className="size-4" />
              Remove
            </DropdownMenuItem>
          </RemoveDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameDialog documentId={documentId} initialTitle={title} open={renameOpen} onOpenChange={setIsRenameOPen} />
    </>
  )
}
