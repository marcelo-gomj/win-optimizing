import { ReactNode, useState } from "react";
import { ArrowDown } from "../icons/arrowDown";
import { ProcessProps } from "./ListProcess";
import * as R from "ramda";
import { ArrowUp } from "../icons/ArrowUp";

type ProcessItemProps = {
  process: ProcessProps,
  isSelected: boolean,
  children: ReactNode,
  handleClickOptimize: () => void,
  memoryTotal: string,
  hasSubproesss: boolean
}

export function ProcessItem({ children,  process, isSelected, hasSubproesss, handleClickOptimize, memoryTotal } : ProcessItemProps) {
  const [activeSubProces, setActiveSubProcess] = useState(false);

  return (
    <li
      key={process.name}
    >
      <div
        onClick={(e: any) => {
          if(R.includes(e.target?.nodeName, ["svg", "path"])){
            return;
          }
          
          handleClickOptimize()
        }}
        className={`grid grid-cols-[50%_25%_25%] py-1 px-3 text-[0.96rem] font-light hover:bg-base-400 cursor-pointer ${isSelected ? 'text-green-300 bg-[rgb(0,12,5)] hover:bg-[rgb(0,24,10)]' : ""}`}
      >
        <p className="flex justify-between z-40">
          <span>{process.name}</span>
          
          {hasSubproesss ? <div
            onClick={() =>  handleClickSubProcess()} 
            className="mx-4 z-50"
          >
            { activeSubProces ? <ArrowUp /> : <ArrowDown /> }
          </div> : null}
        </p>
        
        <p
          className="text-neutral-200 font-medium"
        >
          {memoryTotal}
        </p>
      </div>

      {activeSubProces ? (
        children
      ) 
        : null
      }
    </li>
  )

  function handleClickSubProcess( ){
    setActiveSubProcess(!activeSubProces)
  }
  
}