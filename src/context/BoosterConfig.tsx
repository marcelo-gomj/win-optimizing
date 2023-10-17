import { ReactNode, createContext, useEffect, useState } from "react";
import { BaseDirectory, exists, readTextFile, writeFile,  } from "@tauri-apps/api/fs"

type ProfileConfig = {
  process: string[],
  services : string[],
  tasks : string[],
}

export type ConfigProps = {
  profiles: { [profile: string] :  ProfileConfig },
  current_profile : string | null,
  is_boosted : boolean,
  init_boost : boolean
}

type ConfigContextProps = {
  config: ConfigProps,
  handleSaveConfig: (profiles: ConfigProps) => void
}

type ConfigProviderProps = {
  children: ReactNode
}

const PROFILE_INITIAL = {
  profiles : {
    "default": {
    process: [],
    services : [],
    tasks : [],
  }},
  current_profile : "default",
  is_boosted : false,
  init_boost : false
}

export const ConfigContext = createContext({} as  ConfigContextProps);

export function ConfigProvider({ children } : ConfigProviderProps){
  const [config, setConfig] = useState<ConfigProps>(PROFILE_INITIAL);

  useEffect(() => {
    checkConfigInitial().then(
      res => {
        setConfig(res);
      }
    )
  }, []);

  useEffect(() => {
    const FILE_NAME = "config.json";
    const PATH_CONFIG = {
      dir: BaseDirectory.AppData
    };

    !(async () => 
      await writeFile(FILE_NAME, JSON.stringify(config), PATH_CONFIG)
    )()
  }, [config]);

  function handleSaveConfig(profiles : ConfigProps){
    setConfig(profiles);
  }

  return (
    <ConfigContext.Provider value={{ config, handleSaveConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

async function checkConfigInitial() {
  const FILE_NAME = "config.json";
  const PATH_CONFIG = {
    dir: BaseDirectory.AppData
  };

  const existConfig = await exists(FILE_NAME, PATH_CONFIG);

  if(!existConfig){
    const profileInitial = JSON.stringify(PROFILE_INITIAL);

    await writeFile(FILE_NAME, profileInitial, PATH_CONFIG);
  }

  const config = await readTextFile(FILE_NAME, PATH_CONFIG);

  return JSON.parse(config);
}