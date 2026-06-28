"use client";

import { Bold, Italic, LucideIcon,PrinterIcon,Redo2Icon,SpellCheckIcon,Underline,Undo2Icon } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
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
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-2.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item)=> (
        <ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item=>(
        <ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
      )))}
    </div>
  )
}

export default Toolbar;
