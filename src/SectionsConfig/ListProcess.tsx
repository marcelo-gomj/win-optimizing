import { useEffect, useState } from "react";
// import { processes } from "../jsons/process";
import { invoke } from "@tauri-apps/api"
import * as R from "ramda";

import { ProcessItem } from "./ProcessItem";
type ListProcessProps = {
  list: string[],
  optimizeItem?: (id: string) => void
}

export type ProcessProps = {
  name: string,
  cpu_used: number,
  memory_used: number,
  parent: string,
  exec_path: string,
  path: string,
  pid: string,
}

export function ListProcess({ list, optimizeItem }: ListProcessProps) {
  const [processOptimized, setProcessOptimized] = useState([] as ProcessProps[][]);


  useEffect(() => {
    invoke("list_process_fn").then(list => {
      const data =
        R.collectBy(R.prop("exec_path"),
          R.filter(process => !!process.cpu_used, list  as ProcessProps[])
        )
  
      setProcessOptimized(data);
    })
  }, []);

  function formatMemoryDisplay(memory: number){
    return ((memory / 1024) / 1024).toFixed(2) + " MB"
  }

  return (
    <div className="h-full">
      <div className="sticky top-0 border-y-2 text-neutral-300 items-center border-base-200 h-[2.4rem] px-3 grid grid-cols-[50%_25%_25%]">
        <p>Nome</p>
        <p>Memória</p>
        <p>CPU</p>
      </div>

      <ul
        className="overflow-scroll h-[90%] font-light"
      >
        {
          R.map(
            (groupProcess) => {
              const groupProcessSorted = R.sort(R.descend(R.prop("memory_used")), groupProcess);
              const [process] = groupProcessSorted;
              const optimized = R.includes(process.pid, list);
              const memoryTotal = formatMemoryDisplay(
                R.reduce((acc, group) => acc += group.memory_used, 0, groupProcess)
              );

              return (
                <ProcessItem
                  process={process}
                  handleClickOptimize={() => { if (optimizeItem) optimizeItem(process.pid) }}
                  isSelected={optimized}
                  memoryTotal={memoryTotal}
                  hasSubproesss={groupProcessSorted.length > 1}
                >
                  <div>
                    {
                      R.map(group => {
                        const selectedSubprocess = R.includes(group.pid, list);

                        return (
                          <div
                            className={`grid pl-8 grid-cols-[50%_25%_25%] py-1 px-3 hover:bg-base-400 cursor-pointer ${selectedSubprocess ? 'text-green-300 bg-[rgb(0,12,5)] hover:bg-[rgb(0,24,10)]' : ""}`}
                            onClick={() => { if (optimizeItem) optimizeItem(group.pid) }}

                          >
                            <p>{group.name}</p>
                            <p>{formatMemoryDisplay(group.memory_used)}</p>
                          </div>
                        )
                      }, R.tail(groupProcessSorted))
                    }
                  </div>
                </ProcessItem>
                // <li 
                //   key={process.name}
                // >
                //   <div
                //     className={`grid grid-cols-[50%_25%_25%] py-1 px-3 text-[0.96rem] font-light hover:bg-base-400 cursor-pointer ${optimized ? 'text-green-300 bg-[rgb(0,12,5)] hover:bg-[rgb(0,24,10)]' : ""}`}
                //     onClick={() =>{if(optimizeItem) optimizeItem(process.pid)}}              
                //   >
                //     <p className="flex justify-between">
                //       <span>{process.name}</span>
                //       <div className="mx-4"><ArrowDown /></div>
                //     </p>
                //     <p
                //       className="text-neutral-200 font-medium"
                //     >{((R.reduce((acc, group) => acc += group.memory_used, 0, groupProcess) / 1024) / 1024 ).toFixed(2)} MB</p>
                //   </div>

                //   <div>
                //     {
                //       R.map( group => {
                //         const selectedSubprocess = R.includes(group.pid, list);


                //         return (
                //           <div 
                //             className={`grid pl-8 grid-cols-[50%_25%_25%] py-1 px-3 hover:bg-base-400 cursor-pointer ${optimized || selectedSubprocess ? 'text-green-300 bg-[rgb(0,12,5)] hover:bg-[rgb(0,24,10)]' : ""}`}
                //             onClick={() =>{if(optimizeItem) optimizeItem(group.pid)}}

                //           >
                //             <p>{group.name}</p> 
                //             <p>{(group.memory_used / 1024 / 1024).toFixed(2) + " MB"}</p> 
                //           </div>
                //         )
                //       }, R.tail(groupProcess))
                //     }
                //   </div>
                // </li>
              )
            }, processOptimized)

        }
      </ul>
    </div>
  )
}
