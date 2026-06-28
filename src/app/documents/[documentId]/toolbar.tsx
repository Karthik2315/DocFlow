"use client";

import { LucideIcon,Undo2Icon } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';

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
        onClick: () => console.log("Undo"),
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-2.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item)=> (
        <ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
      ))}
    </div>
  )
}

export default Toolbar;
