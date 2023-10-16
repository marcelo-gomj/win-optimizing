import { createContext, useState } from "react";
import { Home } from "../layouts/Home";
import { Configs } from "../layouts/Configs";

// type RouterProviderProps = {
// 	children: ReactNode
// }
type pathProps = {
	setPath: (path: string) => void;
}

export const RouterContext = createContext({} as pathProps);

export function RouterLayout(){
	const [route, setRoute] = useState("default");

	const paths : Record<string, any> = {
		"default" : <Home />,
		"config" : <Configs />
	}

	function setPath(path: string){
		setRoute(path)
	}

	return (
		<RouterContext.Provider 
			value={{ setPath }}
		> 
			{paths[route]}
		</RouterContext.Provider>
	)
}
