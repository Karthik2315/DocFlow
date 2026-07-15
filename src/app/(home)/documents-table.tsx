import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react";
import { DocumentRow } from "./document-row";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems:number) => void;
  status:PaginationStatus;
}

export const DocumentsTable = ({documents,loadMore,status}:DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div>
          <Loader2 className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table >
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent text-slate-600">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover-bg-transparent">
                <TableCell colSpan={4} className="h-24 text-center text-slate-300">
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ): (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      {documents !== undefined && documents.length !== 0 && <div className="min-w-screen flex items-center justify-center text-[12px]">
        <button disabled={status !== "CanLoadMore"} onClick={() => loadMore(5)} className=" hover:bg-slate-500 text-slate-400 cursor-pointer rounded-md px-2 py-1 hover:text-white hover:scale-105 duration-200 transition-all">
          {status === "CanLoadMore" ? "Load more" : "End of results"}
        </button>
      </div>}
    </div>
  )
}