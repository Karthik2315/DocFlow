"use client";

import { Bold, Italic, LucideIcon,PrinterIcon,Redo2Icon,SpellCheckIcon,Underline,Undo2Icon,MessageSquarePlus, ListTodo, RemoveFormattingIcon, ChevronDown, HighlighterIcon, Link2Icon, ImageIcon, UploadIcon, SearchIcon,AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, ListIcon,ListOrderedIcon } from 'lucide-react';
import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { type Level} from '@tiptap/extension-heading';
import { type ColorResult,SketchPicker } from "react-color";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ListButton = () => {
  const { editor } = useEditorStore();
  const lists = [
    {
      label:"Bullet List",
      icon : ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick:()=> editor?.chain().focus().toggleBulletList().run()
    },
    {
      label:"Ordered List",
      icon : ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick:()=> editor?.chain().focus().toggleOrderedList().run()
    }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-[12px] font-bold")}>
        <ListIcon className='size-4'/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 bg-slate-100">
        {lists.map(({label,isActive,onClick,icon:Icon})=>(
          <button key={label} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
          )} onClick={onClick}>
            <Icon className="size-6" />
            <span className="text-[12px] font-bold">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AlignButton = () => {
  const { editor } = useEditorStore();
  const alignments = [
    {
      label:"Align Left",
      value:"left",
      icon : AlignLeftIcon
    },
    {
      label:"Align Center",
      value:"center",
      icon : AlignCenterIcon
    },
    {
      label:"Align Right",
      value:"right",
      icon : AlignRightIcon
    },
    {
      label:"Align Justify",
      value:"justify",
      icon:AlignJustifyIcon
    }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-[12px] font-bold")}>
        <AlignLeftIcon className='size-4'/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 bg-slate-100">
        {alignments.map(({label,value,icon:Icon})=>(
          <button key={value} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            editor?.isActive({textAlign:value}) && "bg-neutral-200/80"
          )} onClick={()=> editor?.chain().focus().setTextAlign(value).run()}>
            <Icon className="size-6" />
            <span className="text-[12px] font-bold">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ImageButton = () =>{
  const { editor } = useEditorStore();
  const [imageUrl,setImageUrl] = useState("");
  const [isDialogOpen,setIsDialogOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run()
  };

  const onUpload = ()=>{
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if(file){
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    }
    input.click();
  };

  const handleImageUrlSubmit = ()=>{
    if(imageUrl){
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-[12px] font-bold")}>
          <ImageIcon className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-100">
          <DropdownMenuItem onClick={(onUpload)} className="cursor-pointer">
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
            <SearchIcon className="size-4 mr-2" />
            Paste Image URL 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input placeholder="Insert Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={
            (e) => {
              if(e.key === "Enter"){
                handleImageUrlSubmit();
              }
            }
          } />
        <DialogFooter>
          <Button onClick={handleImageUrlSubmit} className='bg-black text-white hover:scale-105 transition-all duration-500 active:scale-95'>
            Insert
          </Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const LinkButton = () =>{
  const { editor } = useEditorStore();
  const [value,setValue] = useState("");
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setValue("");
  }
  return (
    <DropdownMenu onOpenChange={(open)=> {
      if(open){
        setValue(editor?.getAttributes("link").href || "")
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-[12px] font-bold")}>
        <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2 bg-slate-100'>
        <Input placeholder='https://example.com' value={value} onChange={(e)=>setValue(e.target.value)}/>
        <Button onClick={() => onChange(value)} className='bg-black text-white hover:scale-105 transition-all duration-500 active:scale-95'>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color:ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-[12px] font-bold")}>
          <span className='text-xs'>A</span>
          <div className='w-full h-0.5' style={{background:value}} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HighLightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#FFFFFF";
  const onChange = (color:ColorResult) => {
    editor?.chain().focus().toggleHighlight({color : color.hex}).run();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 py-1 overflow-hidden text-[12px] font-bold")}>
        <HighlighterIcon className='size-4'/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker color={value}  onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    {label:"Normal Text",value:0,fontSize:"16px"},
    {label:"Heading 1",value:1,fontSize:"32px"},
    {label:"Heading 2",value:2,fontSize:"24px"},  
    {label:"Heading 3",value:3,fontSize:"20px"},
    {label:"Heading 4",value:4,fontSize:"18px"},
  ];
  const getCurrentHeading = () => {
    for(let i = 1;i<=4;i++)
    {
      if(editor?.isActive("heading",{level:i})){
        return `Heading ${i}`;
      }
    }
    return "Normal Text";
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 min-w-7 shrink-0 flex items-center justify-center gap-1 rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-[12px] font-bold")}>
          <span className="truncate">
            {getCurrentHeading()}
          </span>
          <ChevronDown className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-slate-50">
        {headings.map(({label,value,fontSize})=> (
           (
            <button key={label} style={{fontSize}} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading",{level:value}) ? "bg-neutral-200/80" : ""
            )} onClick={()=>{
              if(value === 0){
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({level:value as Level}).run();
              }
            }}>
              <span>{label}</span>
            </button>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Garamond", value: "Garamond" },
    { label: "Palatino Linotype", value: "Palatino Linotype" }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-[12px] font-bold")}>
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDown className="ml-2 shrink-0 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({label,value}) => (
          <button key={label} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
          )} style={{fontFamily:value}}
          onClick={()=> editor?.chain().focus().setFontFamily(value).run()}>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button onClick={onClick} className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
      isActive && "bg-neutral-200/80"
    )}>
      <Icon className="size-4" />
    </button>
  )
}

const Toolbar = () => {
  const { editor } = useEditorStore();
  console.log("editor", editor);
  const sections: {
    label:string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label:"Undo",
        icon:Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label:"Redo",
        icon:Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label:"Print",
        icon:PrinterIcon,
        onClick:()=> window.print(),
      },
      {
        label:"Spell Check",
        icon:SpellCheckIcon,
        onClick:()=> {
          if(!editor) return ;
          const dom = editor.view.dom;
          dom.spellcheck = !dom.spellcheck;
        }
      }
    ],
    [
      {
        label:"Bold",
        icon:Bold,
        isActive: editor?.isActive("bold"),
        onClick:()=> editor?.chain().focus().toggleBold().run(),
      },
      {
        label:"Italic",
        icon:Italic,
        isActive: editor?.isActive("italic"),
        onClick:()=> editor?.chain().focus().toggleItalic().run(),
      },
      {
        label:"Underline",
        icon:Underline,
        isActive: editor?.isActive("underline"),
        onClick:()=> editor?.chain().focus().toggleUnderline().run(),
      }
    ],
    [
      {
        label:"Comment",
        icon:MessageSquarePlus,
        onClick:()=> {
          console.log("Comment button clicked");
        },
        isActive: false
      },
      {
        label:"List Todo",
        icon:ListTodo,
        onClick:()=>{
          editor?.chain().focus().toggleTaskList().run();
        },
        isActive: editor?.isActive("taskList")
      },
      {
        label:"Remove Formatting",
        icon:RemoveFormattingIcon,
        onClick:()=> editor?.chain().focus().unsetAllMarks().clearNodes().run()
      }
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-2.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item)=> (
        <ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item=>(
        <ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
      )))}
      <TextColorButton />
      <HighLightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      {sections[2].map((item=>(
        <ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
      )))}
    </div>
  )
}

export default Toolbar;
