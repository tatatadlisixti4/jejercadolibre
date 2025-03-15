import { useEffect, useState } from "react";
import Cart from "./Cart";
import { ItemType } from "../schemas";

export default function Header({items} : {items: ItemType[]}) {
	const [cartState, setCartState] = useState(false);
	useEffect(() => {
		console.log(items);
	}, [items])
	const handlerClick = () => {
		if(!cartState) {
			setCartState(true);
		} else {
			setCartState(false);
		}
	}
	return (
		<div className="bg-amber-300 p-8 mb-10 sticky top-0 flex flex-col gap-4 md:flex-row justify-between items-center">
			<div className="flex flex-col items-center md:flex-row md:items-center gap-2">
				<img src="/logo.svg" width={130} height={130} alt="logo" />
				<p className="font-bold text-4xl">JejercadoLibre</p>
			</div>
			<div 
				className="cursor-pointer relative"
				onClick={handlerClick}
			> 
				<img src="/cart.svg" width={100} height={100} alt="carro" />
				{cartState && (<Cart />)}
			</div>
		</div>
	)
}
