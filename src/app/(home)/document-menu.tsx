import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";


interface DocumentMenuProps {
  documentId: Id<"documents">;
  title:string;
  onNewTab: (id:Id<"documents">) => void;
}

export const DocumentMenu = ({documentId,title,onNewTab}:DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <MoreVertical className="size-4 text-slate-400"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onNewTab(documentId)} className="cursor-pointer bg-white">
          <ExternalLinkIcon className="size-4" />
          Open in a New tab
        </DropdownMenuItem>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem>
            <TrashIcon className="size-4" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}