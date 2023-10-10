import { Settings } from "../icons/Settings";

export function Home(){
	return (
		<div className="h-full">
			<div className="flex items-center justify-center w-full h-[80%]">
					<div className="flex h-[55%] w-[35%] items-center justify-center text-[1.7rem] font-bold border-[6px] rounded-full border-neutral-200 cursor-pointer ring-green-700 ring-4 ring-offset-[6px] ring-offset-black hover:border-white hover:ring-green-500 duration-150 transition-all hover:ring-offset-[8px] active:ring-green-400">
						OTIMIZAR
					</div>	
			</div>
			
			<div className="flex justify-center items-center h-[20%] text-[1.2rem]">
				<div className="flex items-center justify-around gap-5 pl-6 px-8 py-3 rounded-full bg-base-200 hover:bg-base-400 duration-100 transition-[background] cursor-pointer">
					<Settings />
					Configurar Otimizacão
				</div>
			</div>
		</div>
	)
}
