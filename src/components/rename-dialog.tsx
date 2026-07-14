"use client";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, FieldGroup } from "./ui/field";

interface RenameDialog {
  documentId: Id<"documents">;
  initialTitle:string;
  open:boolean;
  onOpenChange : (open:boolean) => void;
};

export const RenameDialog = ({documentId,initialTitle,open,onOpenChange}:RenameDialog) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating,setIsUpdating] = useState(false);
  const [title,setTitle] = useState(initialTitle);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    update({id:documentId , title:title.trim() || "untitled"}).then(() => {onOpenChange(false)}).finally(() => {
      setIsUpdating(false);
    })
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Field>
              <Input  value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button className="border border-black" type="submit" disabled={isUpdating}>
              Save
            </Button>
            <Button className="bg-black text-white" disabled={isUpdating}
            onClick={() => {
              onOpenChange(false);
            }} type="button">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}