"use client";
import React, { useRef, useState } from 'react'
import {FaCaretDown} from 'react-icons/fa'


const markers = Array.from({length: 83},(_,i)=>i);

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
};

const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
  return (
    <div onMouseDown={onMouseDown} onDoubleClick={onDoubleClick} style={{ [isLeft ? 'left':'right']: `${position}px`}}
    className="absolute top-0 w-4 h-full z-[5] group -ml-2">
      <FaCaretDown  className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2"/>
      <div className='absolute left-1/2 top-4 transform -translate-x-1/2' style={{height:"100vh",display:isDragging ? "block":"none",width:"1px",backgroundColor:"#3b72f6",transform:"scaleX(0.5)"}}/>
    </div>
  )
}

const Ruler = () => {
  const [leftMargin,setLeftMargin ] = useState(56);
  const [rightMargin,setRightMargin ] = useState(56);
  const [isDraggingLeft,setIsDraggingLeft] = useState(false);
  const [isDraggingRight,setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  }

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  }

  const handleMouseMove = (e:React.MouseEvent) => {
    if((isDraggingLeft || isDraggingRight) && rulerRef.current){
      const container = rulerRef.current.querySelector("#ruler-container");
      if(container){
        const containerRect = container.getBoundingClientRect();
        const newPosition = e.clientX - containerRect.left;
        const rawPosition = Math.max(0,Math.min(816,newPosition));
        if(isDraggingLeft){
          const maxLeftPosition = 816 - rightMargin - 100;
          const newLeftMargin = Math.min(rawPosition,maxLeftPosition);
          setLeftMargin(newLeftMargin);
        }
        else if(isDraggingRight){
          const maxRightPosition = 816 - (leftMargin + 100);
          const newRightPosition = Math.max(0,816 - rawPosition);
          setRightMargin(Math.min(newRightPosition,maxRightPosition));
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  }

  const LeftDoubleClick = () => {
    setLeftMargin(56);
  }

  const RightDoubleClick = () => {
    setRightMargin(56);
  }


  return (
    <div ref={rulerRef} onMouseUp = {handleMouseUp} onMouseLeave = {handleMouseUp}  onMouseMove={handleMouseMove}
     className="h-6 border-b border-gray-300 flex items-end relative print:hidden">
      <div id="ruler-container" className="max-w-[816px] mx-auto w-full h-full relative">
        <Marker position={leftMargin} isLeft={true} isDragging={isDraggingLeft} onMouseDown={handleLeftMouseDown} onDoubleClick={LeftDoubleClick} />
        <Marker position={rightMargin} isLeft={false} isDragging={isDraggingRight} onMouseDown={handleRightMouseDown} onDoubleClick={RightDoubleClick} />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker)=>{
              const position = (marker * 816)/82;
              return (
                <div key={marker} className="absolute bottom-0 h-full" style={{left: `${position}px`}}>
                  {marker % 10 === 0 && (
                    <>
                    <div className="absolute bottom-0 w-1 h-2 bg-neutral-400" />
                    <span className="text-[12px] absolute bottom-2 text-neutral-500 -translate-x-0.5 transform">
                      {marker/10 + 1}</span> </>
                  )}
                  {
                    marker %5 === 0 && marker % 10 !== 0 && (
                      <>
                         <div className="absolute bottom-0 w-[1px] h-1.5 bg-slate-400" />
                      </>
                    )
                  }
                  {
                    marker %5 !== 0 && (
                      <>
                         <div className="absolute bottom-0 w-[1px] h-1 bg-slate-400" />
                      </>
                    )
                  }
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ruler
