import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
// import { database } from "../jsons/database";
import * as R from "ramda";
import { RouterContext } from "../context/router";
import Bolt from "../icons/bolt";

type ServicesProps = {
  "display_name": string,
  "exec_path": string,
  "id": number,
  "name": string,
  "service_type": number

}

type ServicesListProps = [] | ServicesProps[];

export function Configs(){
  const { setPath } = useContext(RouterContext);

  const categories = [
    "Servicos",
    "Processos",
    "Sistema",
    "Tarefas",
    "Otimizacão",
  ]

  const [services, setServices] = useState<ServicesListProps>([]);
  const [categoryActive, setCategoryActive] = useState(categories[0]);
  const [optimizeServices, setOptimizeServices] = useState<string[]>([])

  useEffect(() => {
    invoke<ServicesListProps>("list_services_active").then((services) => {
      setServices(services)
    });

    // setServices(database)
  }, []);

  function handleToggleService(id: string){
    if(R.includes(id, optimizeServices)){
      setOptimizeServices(R.without([id], optimizeServices));

      return;
    }
    
    setOptimizeServices([...optimizeServices, id]);
    console.log("IDS", optimizeServices);

  }

  return (
    <div className="grid h-full grid-rows-[12%_78%_10%]">
      <header className="flex px-6 py-4">

        {
          categories.map(category => {
            return (
              <div
                className={`w-[20%] ${categoryActive === category ? "opacity-100" : "opacity-60"} cursor-pointer`}
                onClick={() => { setCategoryActive(category) }}
              >
                {category}
              </div>
            )
          })
        }
      </header>

      <ul className="grid px-4 py-0 overflow-y-scroll h-full">
        {
          services.map( li => {
            const optimize = R.includes(li.name, optimizeServices);

            return (
              <li
                key={li.name}
                className={`group grid items-center justify-between ${ optimize ? 'grid-cols-[5%_30%_65%]' : 'grid-cols-[35%_65%]'} px-3 py-1.5 text-[0.96rem] font-light hover:bg-base-400 cursor-pointer ${optimize ? 'text-green-300 bg-[rgb(0,12,5)] hover:bg-[rgb(0,24,10)]' : ""}`}
                onClick={() => {
                  handleToggleService(li.name)
                }}
              >
                {optimize ? <Bolt className="w-4" /> : null}
                <p className="line-clamp-1">{li.name}</p>
                <p className="line-clamp-1 hover:line-clamp-1" title={li.display_name}>{li.display_name}</p>
              </li>
            )
          })
        }
      </ul>

      <footer className="flex px-6 justify-between items-center">

        <div className="flex gap-8">
          <div
            onClick={() => setPath('default')} 
            className="flex items-center cursor-pointer  px-16 rounded-full bg-base-500 py-1"
          >Volar</div>
          <div className="flex items-center cursor-pointer  px-16 rounded-full bg-green-600 py-1">Salvar</div>
          
        </div>
        <div className="flex items-center cursor-pointer  rounded-full py-1"
            onClick={() => setOptimizeServices([])}
          >
            Limpar selecionados
          
            <span className="text-[1.1rem] mx-6">{optimizeServices.length}</span>
          </div>
      </footer>
    </div>
  )
}
