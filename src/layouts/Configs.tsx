import { useContext, useState } from "react";
import { RouterContext } from "../context/router";
import { ConfigContext } from "../context/BoosterConfig";
import { ListServices } from "../SectionsConfig/ListServices";
import * as R from "ramda";
import { ListProcess } from "../SectionsConfig/ListProcess";
import { ListTasks } from "../SectionsConfig/ListTasks";

type SectionsProps = {
  [section : string] : {
    title: string,
    handleList : ((id: any) => void) | null,
    list: any[],
    ListComponents: any
}}

const categories = [
  "services",
  "process",
  "tasks",
  // "system",
  // "otimization",
]

// type ServicesListProps = [] | ServicesProps[];;

export function Configs(){
  const { setPath } = useContext(RouterContext);
  const { config, handleSaveConfig } = useContext(ConfigContext);
  const [categoryActive, setCategoryActive] = useState(categories[0]);
  const [userProfile, _setUserProfile] = useState(config.current_profile);
  const profile = config.profiles[userProfile || 'default'];

  const [optimizeServices, setOptimizeServices] = useState<string[]>(profile?.services || []);
  const [process, setProcess] = useState<string[]>(profile?.process || []);
  const [tasks, setTasks] = useState<string[]>(profile?.tasks || []);

  function handleToggleService(optimizeds: any[], handleState: (list: any[]) => void ) {
    return (id: string) => {
      if(R.includes(id, optimizeds)){
        handleState(R.without([id], optimizeds));
        return;
      }
      
      handleState([...optimizeds, id]);
    }
  }

  function handleButtonSaveConfig() {
    const profiles = config.profiles;
    handleSaveConfig({
      ...config,
      profiles: {
        ...profiles,
        [userProfile || "default"] : {
          process: process,
          services : optimizeServices,
          tasks : tasks,
        }
      }
    })
  }

  const sections : SectionsProps = {
    "services": {
      title: "Serviços",
      handleList: setOptimizeServices,
      list: optimizeServices,
      ListComponents: ListServices
    },
    "process": {
      title: "Processos",
      handleList : setProcess,
      list: process,
      ListComponents: ListProcess
    },
    "tasks": {
      title: "Tarefas",
      handleList : setTasks,
      list: tasks,
      ListComponents: ListTasks
    },
    "system": {
      title: "Sistema",
      handleList : null,
      list: [],
      ListComponents: null
    },
    "otimization": {
      title: "Otimização",
      handleList : null,
      list: [],
      ListComponents: null
    },
  }

  const section = sections[categoryActive];

  return (
    <div className="grid h-full grid-rows-[10%_80%_10%]">
      <header className="flex items-center px-6">
        {
         categories.map((category) => {
            return (
              <div
                className={`w-[20%] ${categoryActive === category ? "opacity-100" : "opacity-60"} cursor-pointer`}
                onClick={() => { setCategoryActive(category) }}
              >
                {sections[category].title}
              </div>
            )
          })
        }
      </header>
        
      <section
        className="relative px-4"
      >
        {section.ListComponents ?  
          <section.ListComponents 
            list={section.list}
            optimizeItem={handleToggleService(section.list, section.handleList as any)}
          /> : null 
        }
      </section>

      <footer className="flex px-6 justify-between items-center">
        <div className="flex gap-8">
          <div
            onClick={() => setPath('default')} 
            className="flex items-center cursor-pointer px-16 py-1.5 rounded-full bg-base-500 active:bg-base-600"
          >Volar</div>
          <div className="flex items-center cursor-pointer px-16 py-1.5 rounded-full bg-green-600 active:bg-green-700"
            onClick={() => handleButtonSaveConfig()}
          >Salvar</div>
          
        </div>

        <div className="flex items-center cursor-pointer py-1.5 rounded-full"
            onClick={() => { if(section.handleList) section.handleList([]) }}
          >
            Limpar selecionados
          
            <span className="text-[1.1rem] mx-6">{section.list.length}</span>
          </div>
      </footer>
    </div>
  )
}
