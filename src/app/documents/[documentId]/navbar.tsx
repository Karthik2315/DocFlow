"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { Menubar,MenubarContent,MenubarItem,MenubarMenu,MenubarSeparator,MenubarShortcut,MenubarSub,MenubarSubContent,MenubarSubTrigger,MenubarTrigger } from "@/components/ui/menubar"
import { BoldIcon, FileBraces, FileIcon, FileJson, FilePenIcon, FilePlus2Icon, FileText, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href='/'>
          <Image src='/logo.svg' alt="Logo" width={36} height={36}/>
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="border-none shadow-none bg-transparent h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-100 h-auto cursor-pointer">
                  File
                </MenubarTrigger>
                <MenubarContent className=" bg-white print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent className="bg-white">
                      <MenubarItem>
                        <FileJson className="size-4 mr-4" />
                        JSON
                      </MenubarItem>
                      <MenubarItem>
                        <GlobeIcon className="size-4 mr-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <FileBraces className="size-4 mr-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
                        <FileText className="size-4 mr-4" />
                        TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlus2Icon className="size-4 mr-4" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-4" />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className="size-4 mr-4" />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-100 h-auto cursor-pointer">
                  Edit
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarItem>
                    <Undo2Icon className="size-4 mr-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <Redo2Icon className="size-4 mr-4" />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-100 h-auto cursor-pointer">
                  Insert
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent className="bg-white">
                      <MenubarItem>
                        1 X 1
                      </MenubarItem>
                      <MenubarItem>
                        2 X 2
                      </MenubarItem>
                      <MenubarItem>
                        3 X 3
                      </MenubarItem>
                      <MenubarItem>
                        4 X 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-100 h-auto cursor-pointer">
                  Format
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-4" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent className="bg-white">
                      <MenubarItem>
                        <BoldIcon className="size-4 mr-4" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <ItalicIcon className="size-4 mr-4" />
                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <UnderlineIcon className="size-4 mr-4" />
                        UnderLine <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <StrikethroughIcon className="size-4 mr-2" />
                        StrikeThrough &nbsp;&nbsp;<MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                      <MenubarItem>
                        <RemoveFormattingIcon className="size-4 mr-4" />
                        Clear Formatting
                      </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  )
}