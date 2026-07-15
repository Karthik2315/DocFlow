"use client";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  children:React.ReactNode;
};

export const RemoveDialog = ({documentId,children}:RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById);
  const [isRemoving,setIsRemoving] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()} className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permently delete your document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-black text-white"
          disabled={isRemoving} onClick={(e) => {
            e.stopPropagation();
            setIsRemoving(true);
            remove({id:documentId}).then(() => toast.success("Document removed")).catch(() => toast.error("Only admins can delete documents")).finally(() => setIsRemoving(false));
          }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}