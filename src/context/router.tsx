import { ReactNode, createContext, useState } from "react";
import { Home } from "../layouts/Home";

// type RouterProviderProps = {
// 	children: ReactNode
// }

type pathProps = {
	setPath: (path: ReactNode) => void
}

export const RouterContext = createContext({} as pathProps);

export function RouterLayout(){
	const [Route, setRoute] = useState(null as any);

	function setPath(component: ReactNode){
		setRoute(component)
	}

	return (
		<RouterContext.Provider value={{ setPath }}> 
			{Route ? <Route /> : <Home />}
		</RouterContext.Provider>
	)
}
