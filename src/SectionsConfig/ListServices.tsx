// import { invoke } from "@tauri-apps/api";
import * as R from "ramda";
import Bolt from "../icons/bolt";
import { database } from "../jsons/database";
import { useEffect, useState } from "react";

type ServicesProps = {
  "display_name": string,
  "exec_path": string,
  "id": number,
  "name": string,
  "service_type": number
}

type ListServicesProps = {
  list: string[],
  optimizeItem ?: (id: string) => void
}


export function ListServices({ list, optimizeItem } : ListServicesProps) {
  const [services, setServices] = useState([] as ServicesProps[]);
  
  useEffect(() => {
    // invoke<ServicesListProps>("list_services_active").then((services) => {
    //   setServices(services)
    // });
    setServices(database);
  }, [])

  return (

    <div className="relative h-full">
      <div className="sticky top-0 border-y-2 text-neutral-300 items-center border-base-200 h-[2.4rem] px-3 grid grid-cols-[35%_65%]">
        <p>Nome</p>
        <p>Detalhes</p>
      </div>

      <ul
        className="relative overflow-y-scroll h-[90%]"
      >{
        R.map( 
        service => {
          const optimize = R.includes(service.name, list);
  
          return (
            <li
              key={service.name}
              className={`group grid items-center justify-between ${optimize ? 'grid-cols-[5%_30%_65%]' : 'grid-cols-[35%_65%]'} px-3 py-1 text-[0.96rem] font-light hover:bg-base-400 cursor-pointer ${optimize ? 'text-green-300 bg-[rgb(0,12,5)] hover:bg-[rgb(0,24,10)]' : ""}`}
              onClick={() => {
                if(optimizeItem) optimizeItem(service.name)
              }}
            >
              {optimize ? <Bolt className="w-4" /> : null}
              <p className="line-clamp-1 w-full">{service.name}</p>
              <p 
                className="line-clamp-1 hover:line-clamp-1" 
                title={service.display_name}
              >
                {service.display_name}
              </p>
            </li>
          )
        }, services
      )}</ul>
    </div>
  )
}
